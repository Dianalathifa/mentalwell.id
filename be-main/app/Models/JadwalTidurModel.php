<?php

namespace App\Models;

use CodeIgniter\Model;

class JadwalTidurModel extends Model
{
    protected $table = 'jadwal_tidur';
    protected $primaryKey = 'id_tidur';
    protected $allowedFields = ['id_partisipan', 'tanggal', 'waktu_tidur', 'waktu_bangun', 'gangguan_tidur'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'id_partisipan' => 'required|integer',
        'tanggal' => 'required|valid_date',
        'waktu_tidur' => 'required',
        'waktu_bangun' => 'required',
        'gangguan_tidur' => 'max_length[255]'
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
        'waktu_tidur' => [
            'required' => 'Waktu tidur wajib diisi.'
        ],
        'waktu_bangun' => [
            'required' => 'Waktu bangun wajib diisi.'
        ],
        'gangguan_tidur' => [
            'max_length' => 'Panjang teks gangguan tidur melebihi batas.'
        ]
    ];

    protected $skipValidation = false;

    // Jika Anda memiliki relasi dengan tabel partisipan, Anda dapat mendefinisikannya di sini
    // public function participant()
    // {
    //     return $this->belongsTo('App\Models\ParticipantModel', 'id_partisipan', 'id_partisipan');
    // }
}
