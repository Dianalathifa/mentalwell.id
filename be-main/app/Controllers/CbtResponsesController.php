<?php

namespace App\Controllers;

use App\Models\CbtTaskResponses;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class CbtResponsesController extends ResourceController
{
    use ResponseTrait;

    protected $modelName = 'App\Models\CbtTaskResponses';
    protected $format = 'json';

    public function create()
{
    $model = new CbtTaskResponses();
    $data = $this->request->getJSON(true);

    // Validasi input
    if (!isset($data['id_task']) || !isset($data['id_partisipan']) || !isset($data['jawaban'])) {
        return $this->fail('Task ID, participant ID, and jawaban are required.', 400);
    }

    // Memeriksa apakah pengguna telah mengisi respons untuk session dan day yang sama pada tanggal yang sama sebelumnya
    $existingResponse = $model->where('id_task', $data['id_task'])
                             ->where('id_partisipan', $data['id_partisipan'])
                             ->where('DATE(submission_date)', date('Y-m-d'))
                             ->first();

    if ($existingResponse) {
        return $this->fail('You cannot submit a jawaban for this session and day today.', 300);
    }

    // Memeriksa apakah tanggal pengisian sesuai dengan aturan yang telah ditetapkan
    $dailyTaskModel = new \App\Models\CbtDailyTask();
    $dailyTask = $dailyTaskModel->find($data['id_task']);

    if (!$dailyTask) {
        return $this->failNotFound('Daily task not found.');
    }

    // Mendapatkan tanggal sekarang
    $currentDate = date('Y-m-d');

    // Memeriksa apakah tanggal pengisian sesuai dengan aturan yang telah ditetapkan
    if ($dailyTask['no_hari'] > 7 || $dailyTask['no_hari'] > 1 && $currentDate == date('Y-m-d')) {
        return $this->fail('Maaf, kamu hari ini sudah melakukan intervensi. Yuk lakukan kembali besok.', 300);
    }

    // Menyimpan respons
    $jawabanData = [
        'id_task' => $data['id_task'],
        'id_partisipan' => $data['id_partisipan'],
        'jawaban' => $data['jawaban'],
        'submission_date' => $currentDate
    ];

    if ($model->insert($jawabanData)) {
        return $this->respondCreated($jawabanData, 'CBT jawaban created');
    } else {
        return $this->fail('Failed to create CBT jawaban');
    }
}




    public function update($id = null)
    {
        $model = new CbtTaskResponses();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data['id_task']) || !isset($data['id_partisipan']) || !isset($data['response'])) {
            return $this->fail('Task ID, participant ID, and response are required.');
        }

        $jawabanData = [
            'id_task' => $data['id_task'],
            'id_partisipan' => $data['id_partisipan'],
            'jawaban' => $data['jawaban'],
            'submission_date' => date('Y-m-d')
        ];

        if ($model->update($id, $jawabanData)) {
            return $this->respond($jawabanData, 200, 'CBT jawaban updated');
        } else {
            return $this->fail('Failed to update CBT jawaban');
        }
    }

    public function delete($id = null)
    {
        $model = new CbtTaskResponses();
        
        if ($model->delete($id)) {
            return $this->respondDeleted(['id' => $id], 'CBT jawaban deleted');
        } else {
            return $this->fail('Failed to delete CBT jawaban');
        }
    }

    public function getByParticipantId($participantId = null)
    {
        // Validasi input
        if (!$participantId) {
            return $this->fail('Participant ID is required.');
        }
    
        $model = new CbtTaskResponses();
    
        // Mendapatkan respons
        $responses = $model->where('id_partisipan', $participantId)->findAll();
    
        if (empty($responses)) {
            return $this->failNotFound('No responses found for participant with ID ' . $participantId);
        }
    
        // Array untuk menyimpan data respons yang diperoleh
        $formattedResponses = [];
    
        // Loop melalui setiap respons
        foreach ($responses as $response) {
            // Mendapatkan informasi tambahan dari tabel cbt_daily_task
            $dailyTaskModel = new \App\Models\CbtDailyTask();
            $dailyTask = $dailyTaskModel->find($response['id_task']);
    
            // Jika task ditemukan
            if ($dailyTask) {
                // Mendapatkan judul sesi dari tabel cbt_session
                $sessionId = $dailyTask['id_session'];
                $sessionModel = new \App\Models\CbtSession();
                $session = $sessionModel->find($sessionId);
    
                // Menambahkan data respons yang diformat dengan informasi tambahan
                $formattedResponse = [
                    'judul_session' => $session['judul_session'],
                    'no_hari' => $dailyTask['no_hari'],
                    'jawaban' => $response['jawaban'],
                    'submission_date' => $response['submission_date']
                ];
    
                $formattedResponses[] = $formattedResponse;
            }
        }
    
        // Mengembalikan respons
        return $this->respond($formattedResponses);
    }

    public function getByTaskAndParticipant($id_task = null, $id_partisipan = null)
{
    // Validasi input
    if (!$id_task || !$id_partisipan) {
        return $this->fail('Task ID and participant ID are required.');
    }

    $model = new CbtTaskResponses();

    // Mendapatkan respons berdasarkan id_task dan id_partisipan
    $response = $model->where('id_task', $id_task)
                     ->where('id_partisipan', $id_partisipan)
                     ->first();

    if (!$response) {
        return $this->failNotFound('No response found for the specified task and participant.');
    }

    // Mengembalikan respons
    return $this->respond($response);
}

    

}
