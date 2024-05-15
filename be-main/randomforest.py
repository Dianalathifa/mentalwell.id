import requests
import pandas as pd
import joblib
import pickle

# URL API untuk data jawaban
url = "http://localhost:8080/api/jawaban"

# Melakukan permintaan HTTP untuk mendapatkan data jawaban
response = requests.get(url)

# Memeriksa apakah permintaan berhasil (status kode 200)
if response.status_code == 200:
    # Mendapatkan data JSON dari respons
    data_jawaban_api = response.json()

    # Membuat DataFrame dari data jawaban API
    df_jawaban = pd.DataFrame(data_jawaban_api)

    # Mengganti nilai jawaban "YA" dan "TIDAK" menjadi 1 dan 0
    df_jawaban['jawaban'] = df_jawaban['jawaban'].map({'YA': 1, 'TIDAK': 0})

    # Mengelompokkan jawaban berdasarkan id_partisipan
    grouped_jawaban = df_jawaban.groupby('id_partisipan')

    # Memuat model dari file pickle menggunakan joblib
    rf_model = joblib.load("d:/Diana/SEMESTER 4/project-mentalwell2/be-main/klasifikasi.pkl")

    # Inisialisasi DataFrame untuk menyimpan hasil prediksi per partisipan
    df_prediksi_per_partisipan = pd.DataFrame(columns=['id_partisipan', 'mental_disorders'])

    # Iterasi melalui setiap kelompok jawaban per partisipan
    for partisipan, data_partisipan in grouped_jawaban:
        # Menyesuaikan data_partisipan agar sesuai dengan format yang diperlukan untuk prediksi
        new_data = {}
        for index, row in data_partisipan.iterrows():
            new_data[f'kuisioner_{row["id_kuisioner"]}'] = row['jawaban']

        # Lakukan prediksi dengan model menggunakan data_partisipan
        predictions = rf_model.predict(pd.DataFrame([new_data]))

        # Simpan hasil prediksi per partisipan ke dalam DataFrame df_prediksi_per_partisipan
        df_prediksi_per_partisipan = df_prediksi_per_partisipan.append({'id_partisipan': partisipan, 'mental_disorders': predictions[0]}, ignore_index=True)

    # Tampilkan DataFrame hasil prediksi per partisipan
    print("Hasil Prediksi per Partisipan:")
    print(df_prediksi_per_partisipan)
else:
    # Jika permintaan tidak berhasil, tampilkan pesan kesalahan
    print("Gagal memuat data jawaban dari API.")
