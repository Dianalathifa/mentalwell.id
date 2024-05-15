<?php

namespace App\Models;

use CodeIgniter\Model;

class JadwalKegiatanModel extends Model
{
    protected $table = 'kegiatan';
    protected $primaryKey = 'id_kegiatan';
    protected $allowedFields = ['id_partisipan', 'tanggal', 'jenis_kegiatan', 'catatan'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'id_partisipan' => 'required|integer',
        'tanggal' => 'required|valid_date',
        'jenis_kegiatan' => 'required|string|max_length[50]',
        'catatan' => 'max_length[255]'
    ];

    protected $validationMessages = [
        'id_partisipan' => [
            'required' => 'ID Partisipan wajib diisi.',
            'integer' => 'ID Partisipan harus berupa angka.'
        ],
        'tanggal' => [
            'required' => 'Tanggal wajib diisi.',
            'valid_date' => 'Format tanggal tidak valid.'
        ],
        'jenis_kegiatan' => [
            'required' => 'Jenis kegiatan wajib diisi.',
            'string' => 'Jenis kegiatan harus berupa teks.',
            'max_length' => 'Jenis kegiatan tidak boleh lebih dari 50 karakter.'
        ],
        'catatan' => [
            'max_length' => 'Catatan tidak boleh lebih dari 255 karakter.'
        ]
    ];

    protected $skipValidation = false;

    // Jika Anda memiliki relasi dengan tabel partisipan, Anda dapat mendefinisikannya di sini
    // public function participant()
    // {
    //     return $this->belongsTo('App\Models\ParticipantModel', 'id_partisipan', 'id_partisipan');
    // }
}
