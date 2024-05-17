<?php

namespace App\Models;

use CodeIgniter\Model;

class GratefulModel extends Model
{
    protected $table = 'grateful';
    protected $primaryKey = 'id_grateful';
    protected $allowedFields = ['id_partisipan','tanggal', 'hal_disyukuri'];
}
