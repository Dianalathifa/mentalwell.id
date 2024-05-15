<?php

namespace App\Controllers;

use App\Models\JadwalTidurModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\Response;

class JadwalTidur extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $jadwalTidurModel = new JadwalTidurModel();
        $jadwalTidur = $jadwalTidurModel->findAll();

        return $this->respond($jadwalTidur, Response::HTTP_OK);
    }

    public function create()
    {
        $jadwalTidurModel = new JadwalTidurModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'waktu_tidur' => $this->request->getVar('waktu_tidur'),
            'waktu_bangun' => $this->request->getVar('waktu_bangun'),
            'gangguan_tidur' => $this->request->getVar('gangguan_tidur')
        ];

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalTidurModel->validationRules, $jadwalTidurModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Simpan data baru
        if ($jadwalTidurModel->save($data) === false) {
            return $this->fail('Gagal menyimpan data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondCreated(['message' => 'Jadwal tidur berhasil ditambahkan.'], 'Jadwal tidur berhasil ditambahkan.');
    }

    public function update($id)
    {
        $jadwalTidurModel = new JadwalTidurModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'waktu_tidur' => $this->request->getVar('waktu_tidur'),
            'waktu_bangun' => $this->request->getVar('waktu_bangun'),
            'gangguan_tidur' => $this->request->getVar('gangguan_tidur')
        ];

        // Cek apakah data yang akan diupdate ada
        $schedule = $jadwalTidurModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Jadwal tidur tidak ditemukan.');
        }

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalTidurModel->validationRules, $jadwalTidurModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Update data
        if ($jadwalTidurModel->update($id, $data) === false) {
            return $this->fail('Gagal memperbarui data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondUpdated(['message' => 'Jadwal tidur berhasil diperbarui.'], 'Jadwal tidur berhasil diperbarui.');
    }

    public function delete($id)
    {
        $jadwalTidurModel = new JadwalTidurModel();

        // Cek apakah data yang akan dihapus ada
        $schedule = $jadwalTidurModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Jadwal tidur tidak ditemukan.');
        }

        // Hapus data
        if ($jadwalTidurModel->delete($id) === false) {
            return $this->fail('Gagal menghapus data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondDeleted(['message' => 'Jadwal tidur berhasil dihapus.'], 'Jadwal tidur berhasil dihapus.');
    }
    public function getByPartisipan($id_partisipan)
    {
        $jadwalTidurModel = new JadwalTidurModel();
        $jadwalTidur = $jadwalTidurModel->where('id_partisipan', $id_partisipan)->findAll();

        if (empty($jadwalTidur)) {
            return $this->failNotFound('Jadwal tidur tidak ditemukan.');
        }

        return $this->respond($jadwalTidur, Response::HTTP_OK);
    }
}
