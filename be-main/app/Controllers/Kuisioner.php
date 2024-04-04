<?php

namespace App\Controllers;

use App\Models\KuisionerModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Kuisioner extends ResourceController
{
    use ResponseTrait;

    // Method untuk mengambil semua data kuisioner
    public function index()
    {
        $model = new KuisionerModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    // Method untuk menampilkan detail kuisioner berdasarkan ID
    public function show($id = null)
    {
        $model = new KuisionerModel();
        $data = $model->find($id);

        if (!$data) {
            return $this->failNotFound('No Data Found');
        }

        return $this->respond($data);
    }

    // Method untuk menambahkan data kuisioner baru
    public function create()
    {
        helper(['form']);

        $rules = [
            'id_kategori' => 'required',
            'pertanyaan' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = [
            'id_kategori' => $this->request->getVar('id_kategori'),
            'pertanyaan' => $this->request->getVar('pertanyaan'),
        ];

        $model = new KuisionerModel();
        $model->insert($data);

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data Inserted',
            ],
        ];

        return $this->respondCreated($response);
    }

    // Method untuk mengupdate data kuisioner berdasarkan ID
    public function update($id = null)
    {
        helper(['form']);

        $rules = [
            'id_kategori' => 'required',
            'pertanyaan' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new KuisionerModel();
        $kuisioner = $model->find($id);

        if (!$kuisioner) {
            return $this->failNotFound('No Data Found');
        }

        $data = [
            'id_kategori' => $this->request->getVar('id_kategori'),
            'pertanyaan' => $this->request->getVar('pertanyaan'),
        ];

        $model->update($id, $data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Updated',
            ],
        ];

        return $this->respond($response);
    }

    // Method untuk menghapus data kuisioner berdasarkan ID
    public function delete($id = null)
    {
        $model = new KuisionerModel();
        $kuisioner = $model->find($id);

        if (!$kuisioner) {
            return $this->failNotFound('No Data Found');
        }

        $model->delete($id);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Deleted',
            ],
        ];

        return $this->respond($response);
    }
}