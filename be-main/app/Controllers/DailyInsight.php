<?php

namespace App\Controllers;

use App\Models\DailyInsightModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class DailyInsight extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new DailyInsightModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new DailyInsightModel();
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
            'judul_content' => 'required',
            'deskripsi' => 'required',
            'image' => 'uploaded[image]|mime_in[image,image/jpg,image/jpeg,image/png]|max_size[image,1024]',
            'tanggal_upload' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $image = $this->request->getFile('image');
        $newImageName = null;

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $newImageName = $image->getRandomName();
            $image->move('images/daily_insight/', $newImageName);
        }

        $data = [
            'judul_content' => $this->request->getVar('judul_content'),
            'deskripsi' => $this->request->getVar('deskripsi'),
            'image' => $newImageName,
            'tanggal_upload' => $this->request->getVar('tanggal_upload'),
        ];

        $model = new DailyInsightModel();
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
            'judul_content' => 'required',
            'deskripsi' => 'required',
            'tanggal_upload' => 'required',
        ];

        if ($this->request->getFile('image')) {
            $rules['image'] = 'mime_in[image,image/jpg,image/jpeg,image/png]|max_size[image,1024]';
        }

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new DailyInsightModel();
        $dailyInsight = $model->find($id);

        if (!$dailyInsight) {
            return $this->failNotFound('No Data Found');
        }

        $newImageName = $dailyInsight['image'];

        $image = $this->request->getFile('image');

        if ($image) {
            if ($image->isValid() && !$image->hasMoved()) {
                if ($newImageName && file_exists('images/daily_insight/' . $newImageName)) {
                    unlink('images/daily_insight/' . $newImageName);
                }

                $newImageName = $image->getRandomName();
                $image->move('images/daily_insight/', $newImageName);
            }
        }

        $data = [
            'judul_content' => $this->request->getVar('judul_content'),
            'deskripsi' => $this->request->getVar('deskripsi'),
            'tanggal_upload' => $this->request->getVar('tanggal_upload'),
            'image' => $newImageName,
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
        $model = new DailyInsightModel();
        $dailyInsight = $model->find($id);

        if (!$dailyInsight) {
            return $this->failNotFound('No Data Found');
        }

        $imagePath = 'images/daily_insight/' . $dailyInsight['image'];

        if ($dailyInsight['image'] && file_exists($imagePath)) {
            unlink($imagePath);
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
