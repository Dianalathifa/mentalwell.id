<?php

namespace App\Models;

use CodeIgniter\Model;

class JadwalOlahragaModel extends Model
{
    protected $table = 'jadwal_olahraga';
    protected $primaryKey = 'id_olahraga';
    protected $allowedFields = ['id_partisipan', 'tanggal', 'jenis_olahraga', 'durasi', 'catatan'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'id_partisipan' => 'required|integer',
        'tanggal' => 'required|valid_date',
        'jenis_olahraga' => 'required|string|max_length[50]',
        'durasi' => 'required|max_length[20]',
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
        'jenis_olahraga' => [
            'required' => 'Jenis olahraga wajib diisi.',
            'string' => 'Jenis olahraga harus berupa teks.',
            'max_length' => 'Jenis olahraga tidak boleh lebih dari 50 karakter.'
        ],
        'durasi' => [
            'required' => 'Jam mulai wajib diisi.',
            'valid_time' => 'Format durasi tidak sesuai.'
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
