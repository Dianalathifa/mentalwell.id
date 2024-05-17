<?php

namespace App\Controllers;

use App\Models\StressVideo;
use CodeIgniter\RESTful\ResourceController;

class VideoStress extends ResourceController
{
    protected $modelName = 'App\Models\StressVideo';
    protected $format    = 'json';

    public function __construct()
    {
        $this->model = new StressVideo();
    }

    public function index()
    {
        $videos = $this->model->findAll();
        return $this->respond($videos);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if ($this->model->insert($data)) {
            return $this->respondCreated('Video created');
        } else {
            return $this->failValidationErrors($this->model->errors());
        }
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        if ($this->model->update($id, $data)) {
            return $this->respond($data, 200, 'Video updated');
        } else {
            return $this->failValidationErrors($this->model->errors());
        }
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id], 'Video deleted');
        } else {
            return $this->failNotFound('No video found with id ' . $id);
        }
    }
}
