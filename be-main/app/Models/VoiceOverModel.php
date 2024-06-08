<?php

namespace App\Models;

use CodeIgniter\Model;

class VoiceOverModel extends Model
{
    protected $table = 'voice_overs';
    protected $primaryKey = 'id';
    protected $allowedFields = ['judul', 'deskripsi', 'file_voice', 'created_at'];

    // Optionally, define validation rules
    protected $validationRules = [
        'judul' => 'required|max_length[255]',
        'file_voice' => 'required|max_length[255]',
    ];
}
