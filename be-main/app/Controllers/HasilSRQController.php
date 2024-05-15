<?php

namespace App\Controllers;

use App\Models\HasilSRQ;
use CodeIgniter\Controller;
use CodeIgniter\API\ResponseTrait;

class HasilSRQController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        // Menginisialisasi model HasilSRQ
        $hasilSRQModel = new HasilSRQ();

        // Mengambil semua data hasil SRQ dari database
        $hasilSRQ = $hasilSRQModel->findAll();

        return $this->respond($hasilSRQ, 200);
    }

    public function create()
    {
        // Menampilkan form untuk membuat data hasil SRQ
        return view('hasil_prediksi/create');
    }

    public function store()
    {
        // Menerima data dari form
        $data = [
            'id_partisipan' => $this->request->getPost('id_partisipan'),
            'points' => $this->request->getPost('points'),
            'mental_disorders' => $this->request->getPost('mental_disorders'),
            'klasifikasi' => $this->request->getPost('klasifikasi'),
        ];

        // Menginisialisasi model HasilSRQ
        $hasilSRQModel = new HasilSRQ();

        // Menyimpan data hasil SRQ ke database
        if ($hasilSRQModel->saveHasilSRQ($data)) {
            // Jika berhasil disimpan, redirect ke halaman index
            return redirect()->to('/hasil-srq')->with('success', 'Data hasil SRQ berhasil disimpan.');
        } else {
            // Jika gagal disimpan, tampilkan pesan error
            return redirect()->back()->withInput()->with('error', 'Gagal menyimpan data hasil SRQ.');
        }
    }

    public function getHasil()
    {
        $model = new HasilSRQ();
        $hasilSRQ = $model->findAll(); // Get all results from the database

        return $this->respond($hasilSRQ, 200); // Return the data as JSON with status code 200
    }
}
