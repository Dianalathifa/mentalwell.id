<?php

namespace App\Controllers;

use App\Models\HasilPrediksiPost;
use CodeIgniter\API\ResponseTrait;

class HasilPrediksiController extends BaseController
{
    use ResponseTrait;

    // Function untuk menampilkan hasil prediksi berdasarkan id_partisipan
    public function getByPartisipan($id_partisipan)
    {
        $hasilPrediksiModel = new HasilPrediksiPost();

        // Ambil data hasil prediksi berdasarkan id_partisipan dari database
        $hasilPrediksi = $hasilPrediksiModel->where('id_partisipan', $id_partisipan)->first();

        if ($hasilPrediksi) {
            return $this->respond($hasilPrediksi);
        } else {
            return $this->fail('Data hasil prediksi tidak ditemukan', 404);
        }
    }

    // Function untuk menampilkan semua hasil prediksi
    public function getAll()
    {
        $hasilPrediksiModel = new HasilPrediksiPost();

        // Ambil semua data hasil prediksi dari database
        $hasilPrediksi = $hasilPrediksiModel->findAll();

        if ($hasilPrediksi) {
            return $this->respond($hasilPrediksi);
        } else {
            return $this->fail('Data hasil prediksi tidak ditemukan', 404);
        }
    }
}
