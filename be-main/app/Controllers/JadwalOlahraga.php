<?php

namespace App\Controllers;

use App\Models\JadwalOlahragaModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\Response;

class JadwalOlahraga extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $jadwalOlahragaModel = new JadwalOlahragaModel();
        $jadwalOlahraga = $jadwalOlahragaModel->findAll();

        return $this->respond($jadwalOlahraga, Response::HTTP_OK);
    }

    public function create()
    {
        $jadwalOlahragaModel = new JadwalOlahragaModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'jenis_olahraga' => $this->request->getVar('jenis_olahraga'),
            'durasi' => $this->request->getVar('durasi'),
            'catatan' => $this->request->getVar('catatan')
        ];

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalOlahragaModel->validationRules, $jadwalOlahragaModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Simpan data baru
        if ($jadwalOlahragaModel->save($data) === false) {
            return $this->fail('Gagal menyimpan data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondCreated(['message' => 'Jadwal olahraga berhasil ditambahkan.'], 'Jadwal olahraga berhasil ditambahkan.');
    }

    public function update($id)
    {
        $jadwalOlahragaModel = new JadwalOlahragaModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'jenis_olahraga' => $this->request->getVar('jenis_olahraga'),
            'durasi' => $this->request->getVar('durasi'),
            'catatan' => $this->request->getVar('catatan')
        ];

        // Cek apakah data yang akan diupdate ada
        $schedule = $jadwalOlahragaModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Jadwal olahraga tidak ditemukan.');
        }

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalOlahragaModel->validationRules, $jadwalOlahragaModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Update data
        if ($jadwalOlahragaModel->update($id, $data) === false) {
            return $this->fail('Gagal memperbarui data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondUpdated(['message' => 'Jadwal olahraga berhasil diperbarui.'], 'Jadwal olahraga berhasil diperbarui.');
    }

    public function delete($id)
    {
        $jadwalOlahragaModel = new JadwalOlahragaModel();

        // Cek apakah data yang akan dihapus ada
        $schedule = $jadwalOlahragaModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Jadwal olahraga tidak ditemukan.');
        }

        // Hapus data
        if ($jadwalOlahragaModel->delete($id) === false) {
            return $this->fail('Gagal menghapus data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondDeleted(['message' => 'Jadwal olahraga berhasil dihapus.'], 'Jadwal olahraga berhasil dihapus.');
    }
    public function getByPartisipan($id_partisipan)
    {
        $jadwalOlahragaModel = new JadwalOlahragaModel();
        $jadwalOlahraga = $jadwalOlahragaModel->where('id_partisipan', $id_partisipan)->findAll();

        if (empty($jadwalOlahraga)) {
            return $this->failNotFound('Jadwal olahraga tidak ditemukan.');
        }

        return $this->respond($jadwalOlahraga, Response::HTTP_OK);
    }
}
