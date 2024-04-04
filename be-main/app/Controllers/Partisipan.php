<?php

namespace App\Controllers;

use App\Models\PartisipanModel;
use CodeIgniter\API\ResponseTrait;

class Partisipan extends BaseController
{
    use ResponseTrait;

    protected $modelName = 'App\Models\PartisipanModel';
    protected $format    = 'json';

    public function index()
    {
        $model = new PartisipanModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new PartisipanModel();
        $data = $model->find($id);

        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Partisipan not found');
        }
    }

    public function create()
    {
        $jsonData = $this->request->getJSON();
        
        $data = [
            'nama_partisipan' => $jsonData->nama_partisipan,
            'email_partisipan' => $jsonData->email_partisipan,
            'password_partisipan' => password_hash($jsonData->password_partisipan, PASSWORD_DEFAULT),
            'usia' => $jsonData->usia,
            'no_telp' => $jsonData->no_telp
        ];

        $model = new PartisipanModel();
        $model->insert($data);

        $response = [
            'status' => 200,
            'messages' => 'Data berhasil ditambahkan',
            'data' => $data
        ];

        return $this->respondCreated($response);
    }

    public function update($id = null)
    {
        $jsonData = $this->request->getJSON();

        $data = [
            'nama_partisipan' => $jsonData->nama_partisipan,
            'email_partisipan' => $jsonData->email_partisipan,
            'password_partisipan' => password_hash($jsonData->password_partisipan, PASSWORD_DEFAULT),
            'usia' => $jsonData->usia,
            'no_telp' => $jsonData->no_telp
        ];

        $model = new PartisipanModel();
        $model->update($id, $data);

        $response = [
            'status' => 200,
            'messages' => 'Data berhasil diubah',
            'data' => $data
        ];

        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $model = new PartisipanModel();
        $model->delete($id);

        $response = [
            'status' => 200,
            'messages' => 'Data berhasil dihapus'
        ];

        return $this->respondDeleted($response);
    }
}
