<?php

namespace App\Models;

use CodeIgniter\Model;

class DailyStatusModel extends Model
{
    protected $table = 'daily_status';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_partisipan', 'intervention_category', 'intervention_week', 'intervention_day', 'is_completed', 'created_at', 'updated_at'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';

    protected $returnType = 'array';
}
