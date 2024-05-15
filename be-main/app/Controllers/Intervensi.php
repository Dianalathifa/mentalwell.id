<?php

namespace App\Controllers;

use App\Models\IntervensiModel;
use App\Models\KategoriTestModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Intervensi extends ResourceController
{
    use ResponseTrait;

    // Method untuk mengambil semua data intervensi
    public function index()
    {
        $model = new IntervensiModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    // Method untuk menampilkan detail intervensi berdasarkan ID
    public function show($id = null)
    {
        $model = new IntervensiModel();
        $data = $model->find($id);

        if (!$data) {
            return $this->failNotFound('No Data Found');
        }

        return $this->respond($data);
    }

    public function byKategoriId($id = null)
    {
        $model = new IntervensiModel(); // Menggunakan model KategoriTestModel
        $data = $model->where('id_kategori_intervensi', $id)->findAll();

        if (!$data) {
            return $this->failNotFound('Category Not Found');
        }

        return $this->respond($data);
    }
    public function byDeskripsiId($id = null)
    {
        $model = new IntervensiModel(); // Menggunakan model KategoriTestModel
        $data = $model->select('deskripsi_challenge')->where('id_intervensi', $id)->findAll();

        if (!$data) {
            return $this->failNotFound('Deskripsi Not Found');
        }

        return $this->respond($data);
    }


    public function byImageId($id = null)
    {
        $model = new IntervensiModel(); // Menggunakan model IntervensiModel
        $data = $model->select('image_challenge')->where('id_intervensi', $id)->findAll();
    
        if (!$data) {
            return $this->failNotFound('Image Not Found');
        }
    
        return $this->respond($data);
    }
    

    // Method untuk menambahkan data intervensi baru
    public function create()
    {
        helper(['form']);

        $rules = [
            'id_kategori_intervensi' => 'required',
            'deskripsi_challenge' => 'required',
            'image_challenge' => 'uploaded[image_challenge]|mime_in[image_challenge,image/jpeg,image/png]|max_size[image_challenge,1024]',
            // Tambahkan aturan validasi untuk kolom lain jika diperlukan
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $image = $this->request->getFile('image_challenge');
        $newImageName = null;

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $newImageName = $image->getRandomName();
            $image->move('images/intervensi/', $newImageName);
        }

        $data = [
            'id_kategori_intervensi' => $this->request->getVar('id_kategori_intervensi'),
            'deskripsi_challenge' => $this->request->getVar('deskripsi_challenge'),
            'image_challenge' => $newImageName,
            // Masukkan data tambahan sesuai kebutuhan
        ];

        $model = new IntervensiModel();
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
        'id_kategori_intervensi' => 'required|integer', // Menambahkan aturan bahwa id_kategori_intervensi harus berupa bilangan bulat
        'deskripsi_challenge' => 'required',
    ];

    // Menambahkan aturan validasi untuk file hanya jika diunggah
    if (!empty($_FILES['image_challenge']['name'])) {
        $rules['image_challenge'] = 'uploaded[image_challenge]|mime_in[image_challenge,image/jpg,image/jpeg,image/png]|max_size[image_challenge,1024]';
    }

    if (!$this->validate($rules)) {
        return $this->fail($this->validator->getErrors());
    }

    $model = new IntervensiModel();
    $intervensi = $model->find($id);

    if (!$intervensi) {
        return $this->failNotFound('No Data Found');
    }

    $newImageName = $intervensi['image_challenge'];

    // Handle file upload
    if (!empty($_FILES['image_challenge']['name'])) {
        $image = $this->request->getFile('image_challenge');

        if ($image->isValid() && !$image->hasMoved()) {
            // Delete previous image if exists
            if ($newImageName && file_exists('images/intervensi/' . $newImageName)) {
                unlink('images/intervensi/' . $newImageName);
            }

            // Generate new image name and move to directory
            $newImageName = $image->getRandomName();
            $image->move('images/intervensi/', $newImageName);
        }
    }

    $data = [
        'id_kategori_intervensi' => $this->request->getVar('id_kategori_intervensi'),
        'deskripsi_challenge' => $this->request->getVar('deskripsi_challenge'),
        'image_challenge' => $newImageName,
        'updated_at' => date('Y-m-d H:i:s'), // Memperbarui 'updated_at'
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

    
    // Method untuk menghapus data intervensi berdasarkan ID
    public function delete($id = null)
    {
        $model = new IntervensiModel();
        $intervensi = $model->find($id);

        if (!$intervensi) {
            return $this->failNotFound('No Data Found');
        }

        $imagePath = 'images/intervensi/' . $intervensi['image_challenge'];

        // Periksa ketersediaan file sebelum mencoba menghapusnya
        if ($intervensi['image_challenge'] && file_exists($imagePath)) {
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
