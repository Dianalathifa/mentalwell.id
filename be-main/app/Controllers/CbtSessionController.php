<?php

namespace App\Controllers;

use App\Models\CbtSession;
use CodeIgniter\RESTful\ResourceController;

class CbtSessionController extends ResourceController
{
    protected $modelName = 'App\Models\CbtSession';
    protected $format = 'json';

    public function index()
    {
        $model = new CbtSession();
        $sessions = $model->findAll();
        return $this->respond($sessions);
    }

    public function create()
    {
        $model = new CbtSession();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data) || !isset($data['no_session']) || !isset($data['judul_session']) || !isset($data['deskripsi_session']) || !isset($data['durasi_session'])) {
            return $this->failValidationErrors('Intervention ID, session number, session title, session description, and session duration are required.');
        }

        $sessionData = [
            'no_session' => $data['no_session'],
            'judul_session' => $data['judul_session'],
            'deskripsi_session' => $data['deskripsi_session'],
            'durasi_session' => $data['durasi_session']
        ];

        if ($model->insert($sessionData)) {
            return $this->respondCreated($sessionData, 'CBT session created');
        } else {
            return $this->failServerError('Failed to create CBT session');
        }
    }

    public function update($id = null)
    {
        $model = new CbtSession();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data) || !isset($data['no_session']) || !isset($data['judul_session']) || !isset($data['deskripsi_session']) || !isset($data['durasi_session'])) {
            return $this->failValidationErrors('Intervention ID, session number, session title, session description, and session duration are required.');
        }

        $sessionData = [
            'no_session' => $data['no_session'],
            'judul_session' => $data['judul_session'],
            'deskripsi_session' => $data['deskripsi_session'],
            'durasi_session' => $data['durasi_session']
        ];

        if ($model->update($id, $sessionData)) {
            return $this->respond($sessionData, 200, 'CBT session updated');
        } else {
            return $this->failServerError('Failed to update CBT session');
        }
    }

    public function delete($id = null)
    {
        $model = new CbtSession();
        
        if ($model->delete($id)) {
            return $this->respondDeleted(['id' => $id], 'CBT session deleted');
        } else {
            return $this->failServerError('Failed to delete CBT session');
        }
    }
}
