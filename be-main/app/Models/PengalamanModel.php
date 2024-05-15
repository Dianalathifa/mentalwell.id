<?php

namespace App\Models;

use CodeIgniter\Model;

class PengalamanModel extends Model
{
    protected $table = 'pengalaman';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_partisipan', 'intervention_category', 'intervention_week', 'experience', 'created_at', 'updated_at'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';

    protected $returnType = 'array';
}
