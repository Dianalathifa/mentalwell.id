<?php

namespace App\Controllers;

use App\Models\JawabanIntervensiModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class JawabanIntervensi extends ResourceController
{
    use ResponseTrait;

    // Get all responses
    public function index()
    {
        $model = new JawabanIntervensiModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    // Get a specific response by ID
    public function show($id = null)
    {
        $model = new JawabanIntervensiModel();
        $data = $model->find($id);

        if (!$data) {
            return $this->failNotFound('No Data Found');
        }

        return $this->respond($data);
    }

    // Get responses by participant ID
    public function getByPartisipan($id_partisipan = null)
    {
        if (!$id_partisipan) {
            return $this->failValidationError('Participant ID is required.');
        }

        $model = new JawabanIntervensiModel();
        $data = $model->where('id_partisipan', $id_partisipan)->findAll();

        if (!$data) {
            return $this->failNotFound('No Data Found for this Participant');
        }

        return $this->respond($data);
    }

    // Create a new response
    public function create()
    {
        $model = new JawabanIntervensiModel();

        // Retrieve data from request body
        $id_intervensi = $this->request->getVar('id_intervensi');
        $id_partisipan = $this->request->getVar('id_partisipan');
        $respon = $this->request->getVar('respon');
        $tanggal_submit = date('Y-m-d'); // Add current date

        // Check if a submission for today already exists
        $existingData = $model->where('id_partisipan', $id_partisipan)
                              ->where('tanggal_submit', $tanggal_submit)
                              ->first();

        if ($existingData) {
            return $this->fail('Tidak bisa mengisi karena hari ini sudah melakukan intervensi', 300);
        }

        // Validate input
        $validation = \Config\Services::validation();
        $validation->setRules([
            'id_intervensi' => 'required|integer',
            'id_partisipan' => 'required|integer',
            'respon' => 'required',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors(), 422); // Use fail() to handle failed validation
        }

        // Save data to the database
        $model->insert([
            'id_intervensi' => $id_intervensi,
            'id_partisipan' => $id_partisipan,
            'respon' => $respon,
            'tanggal_submit' => $tanggal_submit, // Save submission date
        ]);

        return $this->respondCreated(['message' => 'Data Created']);
    }

    // Update a response
    public function update($id = null)
    {
        $model = new JawabanIntervensiModel();

        // Retrieve data from request body
        $respon = $this->request->getVar('respon');

        // Validate input
        $validation = \Config\Services::validation();
        $validation->setRules([
            'respon' => 'required',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors(), 422); // Use fail() to handle failed validation
        }

        // Update data in the database
        $model->update($id, [
            'respon' => $respon,
        ]);

        return $this->respond(['message' => 'Data Updated']);
    }

    // Delete a response
    public function delete($id = null)
    {
        $model = new JawabanIntervensiModel();
        $model->delete($id);

        return $this->respondDeleted(['message' => 'Data Deleted']);
    }
}
