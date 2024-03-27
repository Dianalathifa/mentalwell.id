<?php

namespace App\Controllers;

use App\Models\AdminModel;
use CodeIgniter\RESTful\ResourceController;

class Admin extends ResourceController
{
    protected $modelName = 'App\Models\AdminModel';
    protected $format    = 'json';

    public function index()
    {
        $model = new AdminModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new AdminModel();
        $data = $model->find($id);

        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Admin not found');
        }
    }

    public function create()
    {        $data = [
            'nama_admin' => $this->request->getVar('nama_admin'),
            'password_admin' => password_hash($this->request->getVar('password_admin'), PASSWORD_DEFAULT),
            'email_admin' => $this->request->getVar('email_admin')
        ];
        $model = new AdminModel();
        $model->save($data);
        $response = [
            'status' => 'success',
            'messages' => 'Data berhasil ditambahkan',
            'data' => $data,
        ];

        return $this->respondCreated($data);
    }

    public function update($id = null)
{
    // Membuat instance AdminModel
    $model = new AdminModel();

    // Mencari data admin berdasarkan ID
    $admin = $model->find($id);

    // Memeriksa apakah data admin ditemukan
    if (!$admin) {
        return $this->failNotFound('Data tidak ditemukan');
    }

    // Mendapatkan data yang dikirimkan melalui request
    $data = [
        'nama_admin' => $this->request->getVar('nama_admin'),
        'password_admin' => password_hash($this->request->getVar('password_admin'), PASSWORD_DEFAULT),
        'email_admin' => $this->request->getVar('email_admin')
    ];

    // Menggunakan metode update untuk mengubah data admin
    $proses = $model->update($id, $data);

    // Memeriksa apakah proses update berhasil
    if ($proses) {
        $response = [
            'status' => 200,
            'messages' => 'Data berhasil diubah',
            'data' => $data
        ];
    } else {
        $response = [
            'status' => 402,
            'messages' => 'Gagal diubah',
        ];
    }

    // Mengembalikan respons
    return $this->respond($response);
}


public function delete($id = null)
{
    // Memeriksa apakah ID admin yang diberikan tidak kosong
    if (empty($id)) {
        return $this->fail('ID tidak boleh kosong', 400);
    }

    // Mendapatkan instance AdminModel dari dependency injection
    $model = new AdminModel();

    // Mencari data admin berdasarkan ID
    $admin = $model->find($id);

    // Memeriksa apakah data admin ditemukan
    if (!$admin) {
        return $this->failNotFound('Data tidak ditemukan');
    }

    // Menghapus data admin berdasarkan ID
    $deleted = $model->delete($id);

    // Memeriksa apakah penghapusan berhasil
    if ($deleted) {
        // Jika berhasil, kirimkan respons berhasil
        $response = [
            'status' => 200,
            'messages' => 'Data berhasil dihapus',
        ];
    } else {
        // Jika gagal, kirimkan respons gagal menghapus
        $response = [
            'status' => 402,
            'messages' => 'Gagal menghapus data',
        ];
    }

    return $this->respond($response);
}

}
