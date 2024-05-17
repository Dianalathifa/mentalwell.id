<?php

namespace App\Models;

use CodeIgniter\Model;

class CbtSession extends Model
{
    protected $table = 'cbt_session';
    protected $primaryKey = 'id_session';
    protected $allowedFields = ['no_session', 'judul_session', 'deskripsi_session', 'durasi_session'];

    // Tambahkan metode atau validasi tambahan sesuai kebutuhan
}
