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
        $data = $this->request->getJSON();

        $dataToInsert = [
            'id_partisipan' => $data->id_partisipan,
            'intervention_category' => 'mindfulness',
            'intervention_week' => $data->intervention_week,
            'intervention_day' => $data->intervention_day,
            'is_completed' => $data->is_completed
        ];

        $this->dailyStatusModel->insert($dataToInsert);

        return $this->respondCreated(['message' => 'Daily status saved successfully']);
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
