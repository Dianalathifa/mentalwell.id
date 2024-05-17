<?php

namespace App\Models;

use CodeIgniter\Model;

class CbtDailyTask extends Model
{
    protected $table = 'cbt_daily_task';
    protected $primaryKey = 'id_task';
    protected $allowedFields = ['id_session', 'no_hari', 'judul_task', 'deskripsi_task', 'tips_task', 'is_completed'];

    // Tambahkan metode atau validasi tambahan sesuai kebutuhan
}
