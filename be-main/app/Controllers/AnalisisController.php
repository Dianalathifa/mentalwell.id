<?php

namespace App\Controllers;

use App\Models\Analisis;
use CodeIgniter\API\ResponseTrait;

class AnalisisController extends BaseController
{
    use ResponseTrait;

    // Method untuk menampilkan semua data analisis
    public function index()
    {
        $analisisModel = new Analisis();

        // Ambil semua data analisis dari database
        $analisis = $analisisModel->findAll();

        if ($analisis) {
            return $this->respond($analisis);
        } else {
            return $this->fail('Data analisis tidak ditemukan', 404);
        }
    }
}
