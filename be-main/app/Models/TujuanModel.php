<?php

namespace App\Models;

use CodeIgniter\Model;

class TujuanModel extends Model
{
    protected $table = 'tujuan';
    protected $primaryKey = 'tujuan';
    protected $allowedFields = ['id_partisipan', 'to_do', 'in_progress', 'done'];
    

    protected $validationRules = [
        'id_partisipan' => 'required|integer',
        
    ];

    protected $validationMessages = [
        'id_partisipan' => [
            'required' => 'ID Partisipan wajib diisi.',
            'integer' => 'ID Partisipan harus berupa angka.'
        ]
    ];

    protected $skipValidation = false;

    // Jika Anda memiliki relasi dengan tabel partisipan, Anda dapat mendefinisikannya di sini
    // public function participant()
    // {
    //     return $this->belongsTo('App\Models\ParticipantModel', 'id_partisipan', 'id_partisipan');
    // }
}
