<?php

namespace App\Controllers;

use App\Models\CbtTaskResponses;
use CodeIgniter\RESTful\ResourceController;

class CbtResponsesController extends ResourceController
{
    protected $modelName = 'App\Models\CbtTaskResponses';
    protected $format = 'json';

    public function index()
    {
        $model = new CbtTaskResponses();
        $responses = $model->findAll();
        return $this->respond($responses);
    }

    public function create()
    {
        $model = new CbtTaskResponses();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data['id_task']) || !isset($data['id_partisipan']) || !isset($data['response'])) {
            return $this->failValidationErrors('Task ID, participant ID, and response are required.');
        }

        $responseData = [
            'id_task' => $data['id_task'],
            'id_partisipan' => $data['id_partisipan'],
            'response' => $data['response'],
            'submission_date' => date('Y-m-d')
        ];

        if ($model->insert($responseData)) {
            return $this->respondCreated($responseData, 'CBT response created');
        } else {
            return $this->failServerError('Failed to create CBT response');
        }
    }

    public function update($id = null)
    {
        $model = new CbtTaskResponses();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data['id_task']) || !isset($data['id_partisipan']) || !isset($data['response'])) {
            return $this->failValidationErrors('Task ID, participant ID, and response are required.');
        }

        $responseData = [
            'id_task' => $data['id_task'],
            'id_partisipan' => $data['id_partisipan'],
            'response' => $data['response'],
            'submission_date' => date('Y-m-d')
        ];

        if ($model->update($id, $responseData)) {
            return $this->respond($responseData, 200, 'CBT response updated');
        } else {
            return $this->failServerError('Failed to update CBT response');
        }
    }

    public function delete($id = null)
    {
        $model = new CbtTaskResponses();
        
        if ($model->delete($id)) {
            return $this->respondDeleted(['id' => $id], 'CBT response deleted');
        } else {
            return $this->failServerError('Failed to delete CBT response');
        }
    }

    public function getByParticipantId($participantId = null)
    {
        // Validasi input
        if (!$participantId) {
            return $this->failValidationErrors('Participant ID is required.');
        }

        $model = new CbtTaskResponses();
        $responses = $model->where('id_partisipan', $participantId)->findAll();

        if ($responses) {
            return $this->respond($responses);
        } else {
            return $this->failNotFound('No responses found for participant with ID ' . $participantId);
        }
    }

}