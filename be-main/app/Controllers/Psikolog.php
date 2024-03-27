<?php

namespace App\Controllers;

use App\Models\PsikologModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Psikolog extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new PsikologModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new PsikologModel();
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
            'nama_psikolog' => 'required',
            'deskripsi_psikolog' => 'required',
            'lokasi_psikolog' => 'required',
            'telephone_psikolog' => 'required',
        ];

        // Periksa apakah file gambar telah diunggah sebelum menjalankan validasi terkait gambar
        if ($this->request->getFile('image_psikolog')) {
            $rules['image_psikolog'] = 'uploaded[image_psikolog]|mime_in[image_psikolog,image/jpeg,image/png]|max_size[image_psikolog,1024]';
        }

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $image = $this->request->getFile('image_psikolog');
        $newImageName = null;

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $newImageName = $image->getRandomName();
            $image->move('images/psikolog/', $newImageName);
        }

        $data = [
            'nama_psikolog' => $this->request->getVar('nama_psikolog'),
            'deskripsi_psikolog' => $this->request->getVar('deskripsi_psikolog'),
            'image_psikolog' => $newImageName,
            'lokasi_psikolog' => $this->request->getVar('lokasi_psikolog'),
            'telephone_psikolog' => $this->request->getVar('telephone_psikolog'),
        ];

        $model = new PsikologModel();
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
            'nama_psikolog' => 'required',
            'deskripsi_psikolog' => 'required',
            'lokasi_psikolog' => 'required',
            'telephone_psikolog' => 'required',
        ];

        // Periksa apakah file gambar telah diunggah sebelum menjalankan validasi terkait gambar
        if ($this->request->getFile('image_psikolog')) {
            $rules['image_psikolog'] = 'uploaded[image_psikolog]|mime_in[image_psikolog,image/jpeg,image/png]|max_size[image_psikolog,1024]';
        }

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new PsikologModel();
        $psikolog = $model->find($id);

        if (!$psikolog) {
            return $this->failNotFound('No Data Found');
        }

        $newImageName = $psikolog['image_psikolog'];

        $image = $this->request->getFile('image_psikolog');

        if ($image) {
            if ($image->isValid() && !$image->hasMoved()) {
                if ($newImageName && file_exists('images/psikolog/' . $newImageName)) {
                    unlink('images/psikolog/' . $newImageName);
                }

                $newImageName = $image->getRandomName();
                $image->move('images/psikolog/', $newImageName);
            }
        }

        $data = [
            'nama_psikolog' => $this->request->getVar('nama_psikolog'),
            'deskripsi_psikolog' => $this->request->getVar('deskripsi_psikolog'),
            'image_psikolog' => $newImageName,
            'lokasi_psikolog' => $this->request->getVar('lokasi_psikolog'),
            'telephone_psikolog' => $this->request->getVar('telephone_psikolog'),
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
        $model = new PsikologModel();
        $psikolog = $model->find($id);

        if (!$psikolog) {
            return $this->failNotFound('No Data Found');
        }

        $imagePath = 'images/psikolog/' . $psikolog['image_psikolog'];

        // Periksa ketersediaan file sebelum mencoba menghapusnya
        if ($psikolog['image_psikolog'] && file_exists($imagePath)) {
            // Hapus file gambar
            if (!unlink($imagePath)) {
                // Jika gagal menghapus file, berikan respons kesalahan
                return $this->fail('Failed to delete image file');
            }
        }

        // Hapus data dari database
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