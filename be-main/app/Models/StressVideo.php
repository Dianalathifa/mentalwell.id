<?php

namespace App\Models;

use CodeIgniter\Model;

class StressVideo extends Model
{
    protected $table = 'stress_videos';
    protected $primaryKey = 'id';
    protected $allowedFields = ['judul', 'url'];

   
}
