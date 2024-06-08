<?php

namespace App\Controllers;

use App\Models\DepresiRinganProgress;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use DateTime;

class DepresiRinganChecklist extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $partisipanId = $this->request->getVar('id_partisipan');

        if (!$partisipanId) {
            return $this->failValidationError('Participant ID is required.');
        }

        $model = new DepresiRinganProgress();
        $checklist = $model->getChecklistByUser($partisipanId);

        return $this->respond($checklist);
    }

    public function checkDay()
    {
        $partisipanId = $this->request->getVar('id_partisipan');
        $day = $this->request->getVar('hari');
        $status = $this->request->getVar('status');

        if (!$partisipanId || !$day) {
            return $this->failValidationError('Participant ID and day are required.');
        }

        $model = new DepresiRinganProgress();
        $currentDay = $this->getCurrentDay($partisipanId);

        // Periksa apakah pengguna mencoba untuk memeriksa hari berikutnya sebelum berganti hari
        if ($day > $currentDay) {
            return $this->fail('Sorry, you have already checked today\'s progress. Please check back tomorrow.');
        }

        $data = [
            'id_partisipan' => $partisipanId,
            'hari' => $day,
            'tanggal' => date('Y-m-d'),
            'status' => $status === 'true' ? true : false,
        ];

        $existingEntry = $model->getChecklistByDay($partisipanId, $day);
        if ($existingEntry) {
            $model->update($existingEntry['id'], $data);
        } else {
            $model->save($data);
        }

        return $this->respond(['message' => 'Day checked successfully.']);
    }

    private function getCurrentDay($partisipanId)
    {
        $model = new DepresiRinganProgress();
        $checklist = $model->getChecklistByUser($partisipanId);

        if (empty($checklist)) {
            return 1;
        }

        $lastEntry = end($checklist);
        $lastDate = new DateTime($lastEntry['tanggal']);
        $currentDate = new DateTime();
        $interval = $currentDate->diff($lastDate);

        return $interval->days + 1;
    }

    public function showByIdPartisipan($partisipanId)
    {
        $model = new DepresiRinganProgress();
        $checklist = $model->getChecklistByUser($partisipanId);

        if (!$checklist) {
            return $this->failNotFound('Checklist not found for this participant.');
        }

        return $this->respond($checklist);
    }
}
?>
