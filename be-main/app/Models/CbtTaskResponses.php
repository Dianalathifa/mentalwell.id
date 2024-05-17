<?php

namespace App\Models;

use CodeIgniter\Model;

class CbtTaskResponses extends Model
{
    protected $table = 'cbt_task_responses';
    protected $primaryKey = 'id_responses';
    protected $allowedFields = ['id_task', 'id_partisipan', 'response', 'submission_date'];

    // Methods, if any
}
