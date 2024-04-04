<?php

namespace App\Controllers;

use App\Models\AdminModel;
use CodeIgniter\API\ResponseTrait;

class Admin extends BaseController
{
    use ResponseTrait;

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
    {
        $jsonData = $this->request->getJSON();
        
        $data = [
            'nama_admin' => $jsonData->nama_admin,
            'email_admin' => $jsonData->email_admin,
            'password_admin' => password_hash($jsonData->password_admin, PASSWORD_DEFAULT)
        ];

        $model = new AdminModel();
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
            'nama_admin' => $jsonData->nama_admin,
            'email_admin' => $jsonData->email_admin,
            'password_admin' => password_hash($jsonData->password_admin, PASSWORD_DEFAULT)
        ];

        $model = new AdminModel();
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
        $model = new AdminModel();
        $model->delete($id);

        $response = [
            'status' => 200,
            'messages' => 'Data berhasil dihapus'
        ];

        return $this->respondDeleted($response);
    }
}
