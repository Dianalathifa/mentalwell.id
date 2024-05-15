<?php

namespace App\Controllers;

use App\Models\PolaMakanModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\Response;

class PolaMakan extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $polaMakanModel = new PolaMakanModel();
        $polaMakan = $polaMakanModel->findAll();

        return $this->respond($polaMakan, Response::HTTP_OK);
    }

    public function create()
    {
        $polaMakanModel = new PolaMakanModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'jenis_makanan' => $this->request->getVar('jenis_makanan'),
            'deskripsi_makanan' => $this->request->getVar('deskripsi_makanan'),
            'kalori' => $this->request->getVar('kalori'),
            'karbohidrat' => $this->request->getVar('karbohidrat'),
            'protein' => $this->request->getVar('protein'),
            'lemak' => $this->request->getVar('lemak'),
            'keterangan_tambahan' => $this->request->getVar('keterangan_tambahan')
        ];

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($polaMakanModel->validationRules, $polaMakanModel->validationMessages)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Simpan data baru
        if ($polaMakanModel->save($data) === false) {
            return $this->fail('Gagal menyimpan data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondCreated(['message' => 'Data pola makan berhasil ditambahkan.'], 'Data pola makan berhasil ditambahkan.');
    }

    public function update($id)
    {
        $polaMakanModel = new PolaMakanModel();
        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'tanggal' => $this->request->getVar('tanggal'),
            'jenis_makanan' => $this->request->getVar('jenis_makanan'),
            'deskripsi_makanan' => $this->request->getVar('deskripsi_makanan'),
            'kalori' => $this->request->getVar('kalori'),
            'karbohidrat' => $this->request->getVar('karbohidrat'),
            'protein' => $this->request->getVar('protein'),
            'lemak' => $this->request->getVar('lemak'),
            'keterangan_tambahan' => $this->request->getVar('keterangan_tambahan')
        ];

        // Cek apakah data yang akan diupdate ada
        $schedule = $polaMakanModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Pola makan tidak ditemukan.');
        }

        // Validasi input
        $validation =  \Config\Services::validation(); // Inisialisasi variabel $validation
        if (!$this->validate($polaMakanModel->validationRules, $polaMakanModel->polaMakanModel)) {
            return $this->fail($validation->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        // Update data
        if ($polaMakanModel->update($id, $data) === false) {
            return $this->fail('Gagal memperbarui data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondUpdated(['message' => 'Pola Makan berhasil diperbarui.'], 'Pola Makan berhasil diperbarui.');
    }

    public function delete($id)
    {
        $polaMakanModel = new PolaMakanModel();

        // Cek apakah data yang akan dihapus ada
        $schedule = $polaMakanModel->find($id);
        if (!$schedule) {
            return $this->failNotFound('Pola Makan tidak ditemukan.');
        }

        // Hapus data
        if ($polaMakanModel->delete($id) === false) {
            return $this->fail('Gagal menghapus data.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->respondDeleted(['message' => 'Pola Makan berhasil dihapus.'], 'Pola Makan berhasil dihapus.');
    }
    public function getByPartisipan($id_partisipan)
    {
        $polaMakanModel = new PolaMakanModel();
        $polaMakan= $polaMakanModel->where('id_partisipan', $id_partisipan)->findAll();

        if (empty($polaMakan)) {
            return $this->failNotFound('Pola Makan tidak ditemukan.');
        }

        return $this->respond($polaMakan, Response::HTTP_OK);
    }

}