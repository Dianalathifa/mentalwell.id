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

    // Ambil data dari body request
    $id_task = $this->request->getVar('id_task');
    $id_partisipan = $this->request->getVar('id_partisipan');
    $jawaban = $this->request->getVar('jawaban');
    $submission_date = date('Y-m-d'); 

    // Validasi input
    $validation = \Config\Services::validation();
    $validation->setRules([
        'id_task' => 'required|integer',
        'id_partisipan' => 'required|integer',
        'jawaban' => 'required',
    ]);

    if (!$validation->withRequest($this->request)->run()) {
        return $this->fail($validation->getErrors(), 422); // Menggunakan fail() untuk menangani validasi yang gagal
    }

    // Memeriksa apakah pengguna telah mengisi respons untuk session dan day yang sama pada tanggal yang sama sebelumnya
    $existingResponse = $model->where('id_partisipan',$id_partisipan)
                             ->where('submission_date', $submission_date)
                             ->first();

    if ($existingResponse) {
        return $this->fail('Tidak bisa mengisi karena hari ini sudah melakukan intervensi', 300);
    }

    // Mendapatkan informasi task saat ini
    $dailyTaskModel = new \App\Models\CbtDailyTask();
    $currentTask = $dailyTaskModel->find($id_task);

    if (!$currentTask) {
        return $this->failNotFound('Task tidak ditemukan.');
    }

    // Mendapatkan informasi session saat ini
    $currentSessionId = $currentTask['id_session'];
    $sessionModel = new \App\Models\CbtSession();
    $currentSession = $sessionModel->find($currentSessionId);

    if (!$currentSession) {
        return $this->failNotFound('Session tidak ditemukan.');
    }

    // Memeriksa apakah ini adalah session pertama
    if ($currentSessionId > 1) {
        // Mendapatkan session sebelumnya
        $previousSessionId = $currentSessionId - 1;
        $previousSession = $sessionModel->find($previousSessionId);

        if ($previousSession) {
            // Mendapatkan semua task dari session sebelumnya
            $previousTasks = $dailyTaskModel->where('id_session', $previousSessionId)->findAll();

            foreach ($previousTasks as $previousTask) {
                $response = $model->where('id_task', $previousTask['id_task'])
                                  ->where('id_partisipan', $id_partisipan)
                                  ->first();
                if (!$response) {
                    return $this->fail('Tidak bisa melanjutkan ke sesi berikutnya sebelum menyelesaikan semua task di sesi sebelumnya.', 400);
                }
            }
        }
    }

    // Simpan data ke database
    $model->insert([
        'id_task' => $id_task,
        'id_partisipan' => $id_partisipan,
        'jawaban' => $jawaban,
        'submission_date' => $submission_date, // Simpan tanggal submit
    ]);

    return $this->respondCreated(['message' => 'Data Created']);
}



    public function update($id = null)
    {
        $model = new CbtTaskResponses();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data['id_task']) || !isset($data['id_partisipan']) || !isset($data['jawaban'])) {
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
