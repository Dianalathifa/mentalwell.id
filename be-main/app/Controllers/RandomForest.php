<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class RandomForestController extends Controller
{
    public function index()
    {
        // Path menuju file pickle
        $pickleFilePath = FCPATH . 'path_to_your_pickle_file/random_forest_model.pkl';

        // Memuat model Random Forest dari file pickle
        $rfModel = pickle_loads(file_get_contents($pickleFilePath));

        // Data input yang ingin diprediksi
        $inputData = [
            'age' => 22,
            'gender' => 0,
            'headaches' => 0,
            'appetite_poor' => 0,
            // Tambahkan data input lainnya sesuai kebutuhan
        ];

        // Melakukan prediksi menggunakan model Random Forest
        $prediction = $rfModel->predict([$inputData]);

        // Menampilkan hasil prediksi
        echo "Hasil Prediksi: " . $prediction;
    }
}
