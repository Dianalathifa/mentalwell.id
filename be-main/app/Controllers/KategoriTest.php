<?php

namespace App\Controllers;

use App\Models\KategoriTestModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class KategoriTest extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new KategoriTestModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    public function getAll()
    {
        $model = new KategoriTestModel();
        $kategoriTest = $model->findAll();

        return $this->respond($kategoriTest);
    }

    public function show($id = null)
    {
        $model = new KategoriTestModel();
        $data = $model->find($id);

        if (!$data) {
            return $this->failNotFound('No Data Found');
        }

        return $this->respond($data);
    }

    public function create()
    {
        helper(['form']);

        $rules = [
            'nama_test' => 'required',
            'deskripsi_test' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = [
            'nama_test' => $this->request->getVar('nama_test'),
            'deskripsi_test' => $this->request->getVar('deskripsi_test'),
            'sub_test' => $this->request->getVar('sub_test'),
        ];

        $model = new KategoriTestModel();
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

    public function update($id = null)
    {
        helper(['form']);

        $rules = [
            'nama_test' => 'required',
            'deskripsi_test' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new KategoriTestModel();
        $kategoriTest = $model->find($id);

        if (!$kategoriTest) {
            return $this->failNotFound('No Data Found');
        }

        $data = [
            'nama_test' => $this->request->getVar('nama_test'),
            'deskripsi_test' => $this->request->getVar('deskripsi_test'),
            'sub_test' => $this->request->getVar('sub_test'),
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

    public function delete($id = null)
    {
        $model = new KategoriTestModel();
        $kategoriTest = $model->find($id);

        if (!$kategoriTest) {
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