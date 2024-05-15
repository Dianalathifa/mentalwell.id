<?php

namespace App\Controllers;

use App\Models\TujuanModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\Response;

class JadwalTujuan extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $jadwalTujuanModel = new TujuanModel();
        $jadwalTujuan = $jadwalTujuanModel->findAll();

        return $this->respond($jadwalTujuan, Response::HTTP_OK);
    }

    public function create()
    {
        $jadwalTujuanModel = new TujuanModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'to_do' => $this->request->getVar('to_do'),
            'in_progress' => $this->request->getVar('in_progress'),
            'done' => $this->request->getVar('done')
        ];

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalTujuanModel->validationRules, $jadwalTujuanModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Simpan data baru
        if ($jadwalTujuanModel->save($data) === false) {
            return $this->fail('Gagal menyimpan data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondCreated(['message' => 'Jadwal tujuan berhasil ditambahkan.'], 'Jadwal tujuan berhasil ditambahkan.');
    }

    public function update($id)
    {
        $jadwalTujuanModel = new TujuanModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'to_do' => $this->request->getVar('to_do'),
            'in_progress' => $this->request->getVar('in_progress'),
            'done' => $this->request->getVar('done')
        ];

        // Cek apakah data yang akan diupdate ada
        $tujuan = $jadwalTujuanModel->find($id);
        if (!$tujuan) {
            return $this->failNotFound('Jadwal tujuan tidak ditemukan.');
        }

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalTujuanModel->validationRules, $jadwalTujuanModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Update data
        if ($jadwalTujuanModel->update($id, $data) === false) {
            return $this->fail('Gagal memperbarui data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondUpdated(['message' => 'Jadwal tujuan berhasil diperbarui.'], 'Jadwal tujuan berhasil diperbarui.');
    }

    public function delete($id)
    {
        $jadwalTujuanModel = new TujuanModel();

        // Cek apakah data yang akan dihapus ada
        $tujuan = $jadwalTujuanModel->find($id);
        if (!$tujuan) {
            return $this->failNotFound('Jadwal tujuan tidak ditemukan.');
        }

        // Hapus data
        if ($jadwalTujuanModel->delete($id) === false) {
            return $this->fail('Gagal menghapus data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondDeleted(['message' => 'Jadwal tujuan berhasil dihapus.'], 'Jadwal tujuan berhasil dihapus.');
    }
    public function getByPartisipan($id_partisipan)
    {
        $jadwalTujuanModel = new TujuanModel();
        $jadwalTujuan = $jadwalTujuanModel->where('id_partisipan', $id_partisipan)->findAll();

        if (empty($jadwalTujuan)) {
            return $this->failNotFound('Jadwal tujuan tidak ditemukan.');
        }

        return $this->respond($jadwalTujuan, Response::HTTP_OK);
    }
}
