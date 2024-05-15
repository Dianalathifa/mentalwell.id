import pickle
import pandas as pd
import requests
import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='*')

# Memuat model dari file pickle
with open('D:/Diana/SEMESTER 4/project-mentalwell2/be-main/mental_disorders_new.pkl', 'rb') as f:
    rf_model = pickle.load(f)

# URL API
api_url = "http://localhost:8080/api/jawaban-srq"

def klasifikasi_data_terbaru():
    try:
        # Koneksi ke database
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="mentalwell"
        )
        mycursor = mydb.cursor()

        # Mendapatkan data dari API
        response = requests.get(api_url)
        if response.status_code == 200:
            api_data = response.json()
        else:
            print("Gagal mengakses API. Kode status:", response.status_code)
            return

        # Cek apakah ada data baru yang masuk
        if api_data:
            for data in api_data:
                id_partisipan = data['id_partisipan']  # Simpan id_partisipan untuk mencetak keterangan
                # Buat DataFrame dari data API
                new_data_df = pd.DataFrame([data])

                # Konversi tipe data jika diperlukan
                new_data_df = new_data_df.apply(lambda x: pd.to_numeric(x, errors='ignore'))

                # Ganti nilai 'None' dengan 0 dan infer_objects
                new_data_df = new_data_df.fillna(0).infer_objects()


                # Tambahkan kolom 'points' ke dalam data input
                new_data_df['points'] = new_data_df.drop(['id_jawaban', 'id_partisipan', 'points', 'mental_disorders', 'klasifikasi'], axis=1).sum(axis=1)

                # Lakukan prediksi dengan model
                predictions = rf_model.predict(new_data_df.drop(['id_jawaban', 'id_partisipan', 'klasifikasi', 'mental_disorders'], axis=1))

                # Simpan hasil prediksi ke dalam kolom 'mental_disorders'
                new_data_df['mental_disorders'] = predictions

                # Fungsi untuk mengklasifikasikan penyakit berdasarkan jawaban dominan
                def klasifikasi_penyakit(row):
                    # Definisikan kriteria untuk setiap penyakit
                    kriteria_depresi = ['appetite_poor', 'sleep_badly', 'thinking_clearly', 'unhappy', 'cry', 
                                        'difficult_make_decisions', 'unable_useful', 'lost_interest', 'worthless_person', 
                                        'ending_life', 'tired', 'uncomfortable_stomach','work_suffering']
                    kriteria_cemas = ['easily_frightened', 'hands_shake', 'nervous', 'worthless_person']
                    kriteria_stress = ['headaches', 'digestion_poor', 'easily_tired']

                    # Hitung jumlah jawaban yang memenuhi kriteria untuk setiap penyakit
                    count_depresi = sum(row[kriteria] == 1 for kriteria in kriteria_depresi)
                    count_cemas = sum(row[kriteria] == 1 for kriteria in kriteria_cemas)
                    count_stress = sum(row[kriteria] == 1 for kriteria in kriteria_stress)

                    # Tentukan penyakit berdasarkan jumlah jawaban dominan
                    max_count = max(count_depresi, count_cemas, count_stress)
                    if row['mental_disorders'] == 0:  # Jika hasil prediksi gangguan mental adalah 0
                        return 'Tidak Menderita'
                    elif max_count == count_depresi:
                        return 'Depresi'
                    elif max_count == count_cemas:
                        return 'Cemas'
                    elif max_count == count_stress:
                        return 'Stress'
                    else:
                        return 'Belum Diklasifikasikan'

                # Prediksi klasifikasi penyakit dan simpan ke dalam kolom 'klasifikasi'
                new_data_df['klasifikasi'] = new_data_df.apply(klasifikasi_penyakit, axis=1)

                # Cek apakah data sudah ada di database sebelumnya
                sql_check_duplicate = "SELECT id_partisipan FROM hasil_prediksi WHERE id_partisipan = %s"
                mycursor.execute(sql_check_duplicate, (id_partisipan,))
                existing_data = mycursor.fetchone()

                # Menambahkan perintah fetchall() untuk membaca hasil kueri sebelumnya
                mycursor.fetchall()

                if existing_data:
                    print("Data untuk id_partisipan:", id_partisipan, "sudah ada di database.")
                else:
                   # Simpan hasil prediksi ke dalam database
                    sql_insert_data = "INSERT INTO hasil_prediksi (id_partisipan, points, mental_disorders, klasifikasi) VALUES (%s, %s, %s, %s)"
                    val = (id_partisipan, int(new_data_df['points'].iloc[0]), int(new_data_df['mental_disorders'].iloc[0]), new_data_df['klasifikasi'].iloc[0])# Ubah tipe data numpy.int64 menjadi int sebelum dimasukkan ke dalam kueri SQL
                    mycursor.execute(sql_insert_data, val)
                    mydb.commit()
                    print("Data untuk id_partisipan:", id_partisipan, "telah disimpan ke dalam database.")
                    print("Proses klasifikasi data terbaru selesai.")
                
    except Exception as e:
        print("Terjadi kesalahan:", e)

    finally:
            # Tutup koneksi database dan kursor
            if mycursor:
                mycursor.close()
            if mydb:
                mydb.close()

    return jsonify({'message': 'Analysis completed successfully'})

# Definisikan rute API untuk memulai analisis
@app.route('/start-analysis', methods=['POST'])
def start_analysis_api():
    # Set header CORS
    response = jsonify({'message': 'Analysis started successfully'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    klasifikasi_data_terbaru()
    return response

# Endpoint untuk mendapatkan hasil prediksi berdasarkan ID partisipan
@app.route('/hasil-prediksi/<id_partisipan>', methods=['GET'])
def get_hasil_prediksi(id_partisipan):
    try:
        # Koneksi ke database
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="mentalwell"
        )
        mycursor = mydb.cursor()

        sql_get_prediksi = "SELECT * FROM hasil_prediksi WHERE id_partisipan = %s"
        mycursor.execute(sql_get_prediksi, (id_partisipan,))
        hasil_prediksi = mycursor.fetchone()

        if hasil_prediksi:
            # Format hasil prediksi menjadi dictionary
            hasil = {
                'id_hasil': hasil_prediksi[0],
                'id_partisipan': hasil_prediksi[1],
                'points': hasil_prediksi[2],
                'mental_disorders': hasil_prediksi[3],
                'klasifikasi': hasil_prediksi[4]
            }
            return jsonify(hasil)
        else:
            return jsonify({'message': 'Data tidak ditemukan'})

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Tutup koneksi database dan kursor
        if mycursor:
            mycursor.close()
        if mydb:
            mydb.close()

# Endpoint untuk mendapatkan semua hasil prediksi
@app.route('/hasil-prediksi-semua', methods=['GET'])
def get_all_hasil_prediksi():
    try:
        # Koneksi ke database
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="mentalwell"
        )
        mycursor = mydb.cursor()

        # Kueri database untuk mendapatkan semua hasil prediksi
        sql_get_all_prediksi = "SELECT * FROM hasil_prediksi"
        mycursor.execute(sql_get_all_prediksi)
        hasil_prediksi = mycursor.fetchall()

        # Format hasil prediksi menjadi list of dictionaries
        hasil = []
        for row in hasil_prediksi:
            result = {
                'id_hasil': row[0],
                'id_partisipan': row[1],
                'points': row[2],
                'mental_disorders': row[3],
                'klasifikasi': row[4]
            }
            hasil.append(result)

        return jsonify(hasil)

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Tutup koneksi database dan kursor
        if mycursor:
            mycursor.close()
        if mydb:
            mydb.close()

if __name__ == '__main__':
    app.run(debug=True)