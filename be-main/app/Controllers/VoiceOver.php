<?php

namespace App\Controllers;

use App\Models\VoiceOverModel;
use CodeIgniter\RESTful\ResourceController;

class VoiceOver extends ResourceController
{
    protected $modelName = VoiceOverModel::class;
    protected $format    = 'json';

    // List all voice-overs
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    // Get a single voice-over by ID
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Voice-over not found');
        }
        return $this->respond($data);
    }

    // Create a new voice-over
    public function create()
    {
        $rules = [
            'judul' => 'required',
            'file_voice' => 'uploaded[file_voice]|max_size[file_voice,10240]|ext_in[file_voice,mp3,wav]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $file = $this->request->getFile('file_voice');
        if ($file->isValid() && !$file->hasMoved()) {
            $fileName = $file->getRandomName();
            $file->move(WRITEPATH . 'uploads/voiceovers', $fileName);

            $data = [
                'judul' => $this->request->getPost('judul'),
                'deskripsi' => $this->request->getPost('deskripsi'),
                'file_voice' => $fileName,
            ];

            $this->model->insert($data);

            return $this->respondCreated($data);
        }

        return $this->fail($file->getErrorString());
    }

    // Update an existing voice-over
    public function update($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Voice-over not found');
        }

        $rules = [
            'judul' => 'required|max_length[255]',
            'file_voice' => 'max_size[file_voice,10240]|ext_in[file_voice,mp3,wav]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $updateData = [
            'judul' => $this->request->getVar('judul'),
            'deskripsi' => $this->request->getVar('deskripsi'),
        ];

        $file = $this->request->getFile('file_voice');
        if ($file->isValid() && !$file->hasMoved()) {
            $fileName = $file->getRandomName();
            $file->move(WRITEPATH . 'uploads/voiceovers', $fileName);
            $updateData['file_voice'] = $fileName;
        }

        if (!$this->model->update($id, $updateData)) {
            return $this->fail($this->model->errors());
        }

        return $this->respond($updateData);
    }

    // Delete a voice-over
    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Voice-over not found');
        }

        $this->model->delete($id);
        return $this->respondDeleted($data);
    }

    // VoiceOver controller
public function audio($fileName)
{
    // Tentukan path file audio berdasarkan nama file yang diberikan
    $path = WRITEPATH . 'uploads/voiceovers/' . $fileName;

    // Periksa apakah file audio ada
    if (!file_exists($path)) {
        // Jika file tidak ditemukan, kembalikan respons dengan kode status 404 (Not Found)
        return $this->failNotFound('Audio file not found');
    }

    // Set header respons untuk file audio
    $response = service('response');
    return $response->download($path, null, true);
}

}
