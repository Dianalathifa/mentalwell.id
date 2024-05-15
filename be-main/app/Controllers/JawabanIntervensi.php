<?php

namespace App\Controllers;

use App\Models\JawabanIntervensiModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class JawabanIntervensi extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new JawabanIntervensiModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new JawabanIntervensiModel();
        $data = $model->find($id);

        if (!$data) {
            return $this->failNotFound('No Data Found');
        }

        return $this->respond($data);
    }

    public function create()
    {
        $model = new JawabanIntervensiModel();
    
        // Ambil data dari body request
        $id_intervensi = $this->request->getVar('id_intervensi');
        $id_partisipan = $this->request->getVar('id_partisipan');
        $respon = $this->request->getVar('respon');
    
        // Validasi input
        $validation = \Config\Services::validation();
        $validation->setRules([
            'id_intervensi' => 'required|integer',
            'id_partisipan' => 'required|integer',
            'respon' => 'required',
        ]);
    
        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors(), 422); // Menggunakan fail() untuk menangani validasi yang gagal
        }
    
        // Simpan data ke database
        $model->insert([
            'id_intervensi' => $id_intervensi,
            'id_partisipan' => $id_partisipan,
            'respon' => $respon,
        ]);
    
        return $this->respondCreated(['message' => 'Data Created']);
    }
    


    public function update($id = null)
    {
        $model = new JawabanIntervensiModel();

        // Ambil data dari body request
        $respon = $this->request->getVar('respon');

        // Validasi input
        $validation = \Config\Services::validation();
        $validation->setRules([
            'respon' => 'required',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors(), 422); // Menggunakan fail() untuk menangani validasi yang gagal
        }

        // Perbarui data di database
        $model->update($id, [
            'respon' => $respon,
        ]);

        return $this->respond(['message' => 'Data Updated']);
    }

    public function delete($id = null)
    {
        $model = new JawabanIntervensiModel();
        $model->delete($id);

        return $this->respondDeleted(['message' => 'Data Deleted']);
    }
}
