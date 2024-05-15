<?php

namespace App\Controllers;

use App\Models\JadwalKegiatanModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\Response;

class JadwalKegiatan extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $jadwalKegiatanModel = new JadwalKegiatanModel();
        $jadwalKegiatan = $jadwalKegiatanModel->findAll();

        return $this->respond($jadwalKegiatan, Response::HTTP_OK);
    }

    public function create()
    {
        $jadwalKegiatanModel = new JadwalKegiatanModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'jenis_kegiatan' => $this->request->getVar('jenis_kegiatan'),
            'catatan' => $this->request->getVar('catatan')
        ];

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalKegiatanModel->validationRules, $jadwalKegiatanModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Simpan data baru
        if ($jadwalKegiatanModel->save($data) === false) {
            return $this->fail('Gagal menyimpan data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondCreated(['message' => 'Jadwal kegiatan berhasil ditambahkan.'], 'Jadwal kegiatan berhasil ditambahkan.');
    }

    public function update($id)
    {
        $jadwalKegiatanModel = new JadwalKegiatanModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'jenis_kegiatan' => $this->request->getVar('jenis_kegiatan'),
            'catatan' => $this->request->getVar('catatan')
        ];

        // Cek apakah data yang akan diupdate ada
        $schedule = $jadwalKegiatanModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Jadwal kegiatan tidak ditemukan.');
        }

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($jadwalKegiatanModel->validationRules, $jadwalKegiatanModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Update data
        if ($jadwalKegiatanModel->update($id, $data) === false) {
            return $this->fail('Gagal memperbarui data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondUpdated(['message' => 'Jadwal kegiatan berhasil diperbarui.'], 'Jadwal kegiatan berhasil diperbarui.');
    }

    public function delete($id)
    {
        $jadwalKegiatanModel = new JadwalKegiatanModel();

        // Cek apakah data yang akan dihapus ada
        $schedule = $jadwalKegiatanModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Jadwal kegiatan tidak ditemukan.');
        }

        // Hapus data
        if ($jadwalKegiatanModel->delete($id) === false) {
            return $this->fail('Gagal menghapus data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondDeleted(['message' => 'Jadwal kegiatab berhasil dihapus.'], 'Jadwal kegiatan berhasil dihapus.');
    }
    public function getByPartisipan($id_partisipan)
    {
        $jadwalKegiatanModel = new JadwalKegiatanModel();
        $jadwalKegiatan = $jadwalKegiatanModel->where('id_partisipan', $id_partisipan)->findAll();

        if (empty($jadwalKegiatan)) {
            return $this->failNotFound('Jadwal kegiatan tidak ditemukan.');
        }

        return $this->respond($jadwalKegiatan, Response::HTTP_OK);
    }
}
