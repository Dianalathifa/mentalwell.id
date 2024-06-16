<?php

namespace App\Controllers;

use App\Models\DailyStatusModel;
use App\Models\PengalamanModel;
use CodeIgniter\API\ResponseTrait;

class MindfulnessController extends BaseController
{
    use ResponseTrait;

    protected $dailyStatusModel;
    protected $meditationExperienceModel;

    public function __construct()
    {
        $this->dailyStatusModel = new DailyStatusModel();
        $this->meditationExperienceModel = new PengalamanModel();
    }

    public function saveDailyStatus()
    {
        $dailyStatusModel = new DailyStatusModel();
        $idPartisipan = $this->request->getVar('id_partisipan');
        $interventionCategory = $this->request->getVar('intervention_category');
        $interventionWeek = $this->request->getVar('intervention_week');
        $interventionDay = $this->request->getVar('intervention_day');
        $isCompleted = $this->request->getVar('is_completed') ? 1 : 0; // defaul

        // Get the current date
        $currentDate = date('Y-m-d');

         // Check if checklist already exists for today or earlier this week
        $existingChecklist = $dailyStatusModel->where('id_partisipan', $idPartisipan)
                ->where('intervention_category', $interventionCategory)
                ->where('intervention_week', $interventionWeek)
                ->where('DATE(created_at) <=', $currentDate)
                ->first();

        // If checklist already exists for today or earlier this week, return error response
    if ($existingChecklist) {
        return $this->fail('Kamu hari ini sudah melakukan checklist pada intervensimu. Lakukan kembali besok ya!');
    }

        // If it's week 1, create the checklist without further validation
    if ($interventionWeek == 1) {
        // Create new checklist entry
        $data = [
            'id_partisipan' => $idPartisipan,
            'intervention_category' => $interventionCategory,
            'intervention_week' => $interventionWeek,
            'intervention_day' => $interventionDay,
            'is_completed' => $isCompleted
        ];

        $dailyStatusModel->insert($data);

        return $this->respondCreated('Checklist created successfully');
    }

    // Check if all days of the current week are completed
    $completedChecklist = $dailyStatusModel->where('id_partisipan', $idPartisipan)
        ->where('intervention_category', $interventionCategory)
        ->where('intervention_week', $interventionWeek)
        ->where('is_completed', 1)
        ->findAll();
    
    // If not all days of the current week are completed, return error response
    if (count($completedChecklist) < 7 && $interventionDay < 7) {
        return $this->fail('Kamu tidak bisa melakukan checklist pada minggu ini, karena minggu sebelumnya belum selesai');
    }

    // Check if there are incomplete checklists for the previous week
    $previousWeek = $interventionWeek - 1;
    $completedChecklist = $dailyStatusModel->where('id_partisipan', $idPartisipan)
        ->where('intervention_category', $interventionCategory)
        ->where('intervention_week', $previousWeek)
        ->where('is_completed', 1)
        ->findAll();
    
    // If not all days of the previous week are completed, return error response
    if (count($completedChecklist) != 7) {
        return $this->fail('Kamu tidak bisa melakukan checklist pada minggu ini, karena minggu sebelumnya belum selesai');
    }

    // Create new checklist entry
    $data = [
        'id_partisipan' => $idPartisipan,
        'intervention_category' => $interventionCategory,
        'intervention_week' => $interventionWeek,
        'intervention_day' => $interventionDay,
        'is_completed' => $isCompleted
    ];

    $dailyStatusModel->insert($data);
    
    return $this->respondCreated('Checklist created successfully');
}

    public function saveMeditationExperience()
    {
        $data = $this->request->getJSON();

        $dataToInsert = [
            'id_partisipan' => $data->id_partisipan,
            'intervention_category' => 'mindfulness',
            'intervention_week' => $data->intervention_week,
            'experience' => $data->experience
        ];

        $this->meditationExperienceModel->insert($dataToInsert);

        return $this->respondCreated(['message' => 'Meditation experience saved successfully']);
    }

    // New method to fetch daily statuses
    public function getDailyStatuses($id_partisipan)
    {
        try {
            // Assuming you want to fetch daily statuses based on id_partisipan
            $statuses = $this->dailyStatusModel->where('id_partisipan', $id_partisipan)->findAll();
            return $this->respond($statuses);
        } catch (\Exception $e) {
            return $this->failServerError('Failed to fetch daily statuses');
        }
    }

    // New method to fetch meditation experiences
    public function getMeditationExperiences()
    {
        try {
            $experiences = $this->meditationExperienceModel->findAll();
            return $this->respond($experiences);
        } catch (\Exception $e) {
            return $this->failServerError('Failed to fetch meditation experiences');
        }
    }
}
