<?php

namespace App\Controllers;

use App\Models\DailyInsightModel;
use CodeIgniter\API\ResponseTrait;

class DailyInsight extends BaseController
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
            'image' => 'uploaded[image]|max_size[image,1024]|mime_in[image,image/jpg,image/jpeg,image/png]',
            'video' => 'uploaded[video]|max_size[video,10240]|mime_in[video,video/mp4,video/mpeg,video/quicktime]',
            'tanggal_upload' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $image = $this->request->getFile('image');
        $video = $this->request->getFile('video');

        // Upload image
        $newImageName = $image->getRandomName();
        $image->move('images/daily_insight/', $newImageName);

        // Upload video
        $newVideoName = $video->getRandomName();
        $video->move('videos/daily_insight/', $newVideoName);

        $data = [
            'judul_content' => $this->request->getVar('judul_content'),
            'deskripsi' => $this->request->getVar('deskripsi'),
            'tanggal_upload' => $this->request->getVar('tanggal_upload'),
            'image' => $newImageName,
            'video' => $newVideoName,
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

        // Validasi hanya jika gambar atau video diunggah
        if ($this->request->getFile('image') || $this->request->getFile('video')) {
            $rules['image'] = 'max_size[image,1024]|mime_in[image,image/jpg,image/jpeg,image/png]';
            $rules['video'] = 'max_size[video,10240]|mime_in[video,video/mp4,video/mpeg,video/quicktime]';
        }

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new DailyInsightModel();
        $dailyInsight = $model->find($id);

        if (!$dailyInsight) {
            return $this->failNotFound('No Data Found');
        }

        // Update image if uploaded
        if ($this->request->getFile('image')) {
            $image = $this->request->getFile('image');
            $newImageName = $image->getRandomName();
            $image->move('images/daily_insight/', $newImageName);
        } else {
            $newImageName = $dailyInsight['image'];
        }

        // Update video if uploaded
        if ($this->request->getFile('video')) {
            $video = $this->request->getFile('video');
            $newVideoName = $video->getRandomName();
            $video->move('videos/daily_insight/', $newVideoName);
        } else {
            $newVideoName = $dailyInsight['video'];
        }

        $data = [
            'judul_content' => $this->request->getVar('judul_content'),
            'deskripsi' => $this->request->getVar('deskripsi'),
            'tanggal_upload' => $this->request->getVar('tanggal_upload'),
            'image' => $newImageName,
            'video' => $newVideoName,
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

        // Delete image
        $imagePath = 'images/daily_insight/' . $dailyInsight['image'];
        if ($dailyInsight['image'] && file_exists($imagePath)) {
            unlink($imagePath);
        }

        // Delete video
        $videoPath = 'videos/daily_insight/' . $dailyInsight['video'];
        if ($dailyInsight['video'] && file_exists($videoPath)) {
            unlink($videoPath);
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
