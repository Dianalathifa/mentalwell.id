<?php

namespace App\Controllers;

use App\Models\CbtDailyTask;
use CodeIgniter\RESTful\ResourceController;

class DailyTask extends ResourceController
{
    protected $modelName = 'App\Models\CbtDailyTask';
    protected $format = 'json';

    public function index()
    {
        $model = new CbtDailyTask();
        $tasks = $model->findAll();
        return $this->respond($tasks);
    }

    public function create()
    {
        $model = new CbtDailyTask();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data['id_session']) || !isset($data['no_hari']) || !isset($data['judul_task']) || !isset($data['deskripsi_task']) || !isset($data['tips_task'])) {
            return $this->failValidationErrors('Session ID, day number, task title, task description, and task tips are required.');
        }

        $taskData = [
            'id_session' => $data['id_session'],
            'no_hari' => $data['no_hari'],
            'judul_task' => $data['judul_task'],
            'deskripsi_task' => $data['deskripsi_task'],
            'tips_task' => $data['tips_task'],
            'is_completed' => false // Default is_completed to false when creating a new task
        ];

        if ($model->insert($taskData)) {
            return $this->respondCreated($taskData, 'Daily task created');
        } else {
            return $this->failServerError('Failed to create daily task');
        }
    }

    public function update($id = null)
    {
        $model = new CbtDailyTask();
        $data = $this->request->getJSON(true);

        // Validasi input
        if (!isset($data['id_session']) || !isset($data['no_hari']) || !isset($data['judul_task']) || !isset($data['deskripsi_task']) || !isset($data['tips_task'])) {
            return $this->failValidationErrors('Session ID, day number, task title, task description, and task tips are required.');
        }

        $taskData = [
            'id_session' => $data['id_session'],
            'no_hari' => $data['no_hari'],
            'judul_task' => $data['judul_task'],
            'deskripsi_task' => $data['deskripsi_task'],
            'tips_task' => $data['tips_task'],
            'is_completed' => false // Default is_completed to false when creating a new task
        ];

        if ($model->update($id, $taskData)) {
            return $this->respond($taskData, 200, 'Daily task updated');
        } else {
            return $this->failServerError('Failed to update daily task');
        }
    }

    public function delete($id = null)
    {
        $model = new CbtDailyTask();
        
        if ($model->delete($id)) {
            return $this->respondDeleted(['id' => $id], 'Daily task deleted');
        } else {
            return $this->failServerError('Failed to delete daily task');
        }
    }

    public function getByTaskId($id_task = null)
{
    // Validasi input
    if (!$id_task) {
        return $this->failValidationErrors('Task ID is required.');
    }

    $model = new CbtDailyTask(); // Pastikan nama model benar
    $task = $model->where('id_task', $id_task)->first(); // Ambil satu data task

    if ($task) {
        return $this->respond($task);
    } else {
        return $this->failNotFound('No task found with ID ' . $id_task);
    }
}
public function getDailyTasksBySessionId($id_session = null)
{
    // Validasi input
    if (!$id_session) {
        return $this->failValidationErrors('Session ID is required.');
    }

    // Panggil model CbtDailyTask untuk mengambil data daily tasks berdasarkan id session
    $dailyTaskModel = new CbtDailyTask();
    $dailyTasks = $dailyTaskModel->where('id_session', $id_session)->findAll();

    if ($dailyTasks) {
        return $this->respond($dailyTasks);
    } else {
        return $this->failNotFound('No daily tasks found for session with ID ' . $id_session);
    }
}


}
