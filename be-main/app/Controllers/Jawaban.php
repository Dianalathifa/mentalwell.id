<?php

namespace App\Controllers;

use App\Models\JawabanModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Jawaban extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new JawabanModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new JawabanModel();
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
            'id_partisipan' => 'required',
            'id_kuisioner' => 'required',
            'jawaban' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'id_kuisioner' => $this->request->getVar('id_kuisioner'),
            'jawaban' => $this->request->getVar('jawaban'),
        ];

        $model = new JawabanModel();
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
            'id_partisipan' => 'required',
            'id_kuisioner' => 'required',
            'jawaban' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new JawabanModel();
        $jawaban = $model->find($id);

        if (!$jawaban) {
            return $this->failNotFound('No Data Found');
        }

        $data = [
            'id_partisipan' => $this->request->getVar('id_partisipan'),
            'id_kuisioner' => $this->request->getVar('id_kuisioner'),
            'jawaban' => $this->request->getVar('jawaban'),
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
        $model = new JawabanModel();
        $jawaban = $model->find($id);

        if (!$jawaban) {
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