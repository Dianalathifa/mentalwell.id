import pickle
import pandas as pd
import requests
import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app, origins='*')

# Memuat model dari file pickle
with open('D:/Diana/SEMESTER 4/project-mentalwell2/be-main/mental_disorders_new.pkl', 'rb') as f:
    rf_model = pickle.load(f)

# URL API
api_url = "http://localhost:8080/api/analisis"


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
                id_analisis = data['id_analisis']
                id_partisipan = data['id_partisipan']

                # Periksa apakah id analisis sudah ada di database
                sql_check_duplicate = "SELECT id_analisis FROM hasil_prediksi WHERE id_analisis = %s"
                mycursor.execute(sql_check_duplicate, (id_analisis,))
                existing_data = mycursor.fetchone()

                if existing_data:
                    print("Data untuk id analisis:", id_analisis, "sudah ada di database.")
                    continue

                # Buat DataFrame dari data API
                new_data_df = pd.DataFrame([data])

                # Konversi tipe data jika diperlukan
                def convert_to_numeric(x):
                    try:
                        return pd.to_numeric(x)
                    except ValueError:
                        return x

                new_data_df = new_data_df.apply(convert_to_numeric)

                # Tambahkan tanggal tes ke dalam DataFrame
                new_data_df['tanggal_tes'] = datetime.date.today()

                # Ganti nilai 'None' dengan 0 dan infer_objects
                new_data_df = new_data_df.fillna(0).infer_objects()

                # Tambahkan kolom 'points' ke dalam data input
                new_data_df['points'] = new_data_df.drop(['id_analisis', 'id_partisipan', 'points', 'mental_disorders', 'klasifikasi', 'tanggal_tes'], axis=1).sum(axis=1)

                # Lakukan prediksi dengan model
                predictions = rf_model.predict(new_data_df.drop(['id_analisis', 'id_partisipan', 'klasifikasi', 'mental_disorders', 'tanggal_tes'], axis=1))

                # Simpan hasil prediksi ke dalam kolom 'mental_disorders'
                new_data_df['mental_disorders'] = predictions

                # Fungsi untuk mengklasifikasikan penyakit berdasarkan persentase
                def klasifikasi_penyakit(row):
                    # Definisikan kriteria untuk setiap penyakit
                    kriteria_depresi = ['appetite_poor', 'sleep_badly', 'thinking_clearly', 'unhappy', 'cry', 
                                        'difficult_make_decisions', 'unable_useful', 'lost_interest', 'worthless_person', 
                                        'ending_life', 'tired', 'uncomfortable_stomach', 'work_suffering']
                    kriteria_cemas = ['easily_frightened', 'hands_shake', 'nervous', 'worthless_person']
                    kriteria_stress = ['headaches', 'digestion_poor', 'easily_tired']

                    # Hitung jumlah total kriteria untuk setiap kategori
                    total_kriteria_depresi = len(kriteria_depresi)
                    total_kriteria_cemas = len(kriteria_cemas)
                    total_kriteria_stress = len(kriteria_stress)

                    # Hitung jumlah jawaban yang memenuhi kriteria untuk setiap kategori
                    count_depresi = sum(row[kriteria] == 1 for kriteria in kriteria_depresi)
                    count_cemas = sum(row[kriteria] == 1 for kriteria in kriteria_cemas)
                    count_stress = sum(row[kriteria] == 1 for kriteria in kriteria_stress)

                    # Hitung persentase untuk setiap kategori
                    persentase_depresi = (count_depresi / total_kriteria_depresi) * 100
                    persentase_cemas = (count_cemas / total_kriteria_cemas) * 100
                    persentase_stress = (count_stress / total_kriteria_stress) * 100

                    # Tentukan penyakit berdasarkan persentase tertinggi
                    if row['mental_disorders'] == 0:  # Jika hasil prediksi gangguan mental adalah 0
                        return 'Tidak Menderita'
                    else:
                        max_persentase = max(persentase_depresi, persentase_cemas, persentase_stress)
                        if max_persentase == persentase_depresi:
                            return 'Depresi'
                        elif max_persentase == persentase_cemas:
                            return 'Cemas'
                        elif max_persentase == persentase_stress:
                            return 'Stress'
                        else:
                            return 'Belum Diklasifikasikan'


                # Prediksi klasifikasi penyakit dan simpan ke dalam kolom 'klasifikasi'
                new_data_df['klasifikasi'] = new_data_df.apply(klasifikasi_penyakit, axis=1)

                # Simpan hasil prediksi ke dalam database
                sql_insert_data = "INSERT INTO hasil_prediksi (id_analisis, id_partisipan, points, mental_disorders, klasifikasi, tanggal_tes) VALUES (%s, %s, %s, %s, %s, %s)"
                val = (id_analisis, id_partisipan, int(new_data_df['points'].iloc[0]), int(new_data_df['mental_disorders'].iloc[0]), new_data_df['klasifikasi'].iloc[0], new_data_df['tanggal_tes'].iloc[0])
                mycursor.execute(sql_insert_data, val)
                mydb.commit()
                print("Data untuk id analisis:", id_analisis, "telah disimpan ke dalam database.")
                print("Proses klasifikasi data terbaru selesai.")
                
    except Exception as e:
        print("Terjadi kesalahan:", e)

    finally:
        # Tutup koneksi database dan kursor
        if mycursor:
            mycursor.close()
        if mydb:
            mydb.close()

    return jsonify({'message': 'Analisis selesai.'})

# Definisikan rute API untuk memulai analisis
@app.route('/start-analysis', methods=['POST'])
def start_analysis_api():
    # Set header CORS
    response = jsonify({'message': 'Analisis dimulai.'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    klasifikasi_data_terbaru()
    return response

# Endpoint untuk mendapatkan hasil prediksi berdasarkan ID partisipan
@app.route('/hasil-prediksi/<id_partisipan>', methods=['GET'])
def dapatkan_hasil_prediksi(id_partisipan):
    try:
        # Koneksi ke database
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="mentalwell"
        )
        mycursor = mydb.cursor()

        sql_get_prediksi = "SELECT * FROM hasil_prediksi WHERE id_partisipan = %s ORDER BY tanggal_tes DESC LIMIT 1"
        mycursor.execute(sql_get_prediksi, (id_partisipan,))

        hasil_prediksi = mycursor.fetchone()

        if hasil_prediksi:
            # Format hasil prediksi menjadi dictionary
            hasil = {
                'id_hasil': hasil_prediksi[0],
                'id_partisipan': hasil_prediksi[1],
                'points': hasil_prediksi[2],
                'mental_disorders': hasil_prediksi[3],
                'klasifikasi': hasil_prediksi[4],
                'tanggal_tes': hasil_prediksi[5].strftime('%Y-%m-%d'),  # Mengubah format tanggal
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

# Endpoint untuk mendapatkan hasil prediksi terbaru berdasarkan ID partisipan
@app.route('/hasil-prediksi/<id_partisipan>', methods=['GET'])
def dapatkan_hasil_prediksi_terbaru(id_partisipan):
    try:
        # Koneksi ke database
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="mentalwell"
        )
        mycursor = mydb.cursor()

        # Kueri database untuk mendapatkan hasil prediksi terbaru berdasarkan ID partisipan
        sql_get_prediksi_terbaru = "SELECT * FROM hasil_prediksi WHERE id_partisipan = %s ORDER BY tanggal_tes DESC, id_hasil DESC LIMIT 1"
        mycursor.execute(sql_get_prediksi_terbaru, (id_partisipan,))

        hasil_prediksi_terbaru = mycursor.fetchone()

        if hasil_prediksi_terbaru:
            # Format hasil prediksi menjadi dictionary
            hasil = {
                'id_hasil': hasil_prediksi_terbaru[0],
                'id_partisipan': hasil_prediksi_terbaru[1],
                'points': hasil_prediksi_terbaru[2],
                'mental_disorders': hasil_prediksi_terbaru[3],
                'klasifikasi': hasil_prediksi_terbaru[4],
                'tanggal_tes': hasil_prediksi_terbaru[5].strftime('%Y-%m-%d'),  # Mengubah format tanggal
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

if __name__ == '__main__':
    app.run(debug=True)

