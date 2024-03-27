<?php

namespace App\Controllers;

use App\Models\PartisipanModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Partisipans extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new PartisipanModel();
        $data = $model->findAll();
        return $this->respond($data);
    }
 
    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new PartisipanModel();
        $data = $model->find(['id_partisipan' => $id]);
        if(!$data) return $this->failNotFound('No Data Found');
        return $this->respond($data[0]);
    }
 
    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper(['form']);
        $rules = [
            'nama' => 'required',
            'email' => 'required|valid_email',
            'password' => 'required|min_length[8]',
            'no_tlp' => 'required',
            'usia' => 'required|numeric'
        ];
        $data = [
            'nama' => $this->request->getVar('nama'),
            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'no_tlp' => $this->request->getVar('no_tlp'),
            'usia' => $this->request->getVar('usia')
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new PartisipanModel();
        $model->save($data);
        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data Inserted'
            ]
        ];
        return $this->respondCreated($response);
    }
 
    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        helper(['form']);
        $rules = [
            'nama' => 'required',
            'email' => 'required|valid_email',
            'password' => 'min_length[8]',
            'no_tlp' => 'required',
            'usia' => 'required|numeric'
        ];
        $data = [
            'nama' => $this->request->getVar('nama'),
            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'no_tlp' => $this->request->getVar('no_tlp'),
            'usia' => $this->request->getVar('usia')
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new PartisipanModel();
        $findById = $model->find(['id_partisipan' => $id]);
        if(!$findById) return $this->failNotFound('No Data Found');
        $model->update($id, $data);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respond($response);
    }
 
    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $model = new PartisipanModel();
        $findById = $model->find(['id_partisipan' => $id]);
        if(!$findById) return $this->failNotFound('No Data Found');
        $model->delete($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
