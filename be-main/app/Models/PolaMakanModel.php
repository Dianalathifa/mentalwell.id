<?php

namespace App\Models;

use CodeIgniter\Model;

class PolaMakanModel extends Model
{
    protected $table = 'makanan';
    protected $primaryKey = 'id_makan';
    protected $allowedFields = ['id_partisipan', 'tanggal', 'jenis_makanan', 'deskripsi_makanan', 'kalori', 'karbohidrat', 'protein', 'lemak', 'keterangan_tambahan'];


    protected $validationRules    = [
        'id_partisipan' => 'required|integer',
        'tanggal' => 'required|valid_date',
        'jenis_makanan' => 'required',
        'kalori' => 'required|numeric',
        'karbohidrat' => 'required|numeric',
        'protein' => 'required|numeric',
        'lemak' => 'required|numeric',
    ];
    protected $validationMessages = [
        'id_partisipan' => [
            'required' => 'ID partisipan harus diisi.',
            'integer' => 'ID partisipan harus berupa angka.'
        ],
        'tanggal' => [
            'required' => 'Tanggal harus diisi.',
            'valid_date' => 'Tanggal tidak valid.'
        ],
        'jenis_makanan' => [
            'required' => 'Jenis makanan harus diisi.'
        ],
        'kalori' => [
            'required' => 'Kalori harus diisi.',
            'numeric' => 'Kalori harus berupa angka.'
        ],
        'karbohidrat' => [
            'required' => 'Karbohidrat harus diisi.',
            'numeric' => 'Karbohidrat harus berupa angka.'
        ],
        'protein' => [
            'required' => 'Protein harus diisi.',
            'numeric' => 'Protein harus berupa angka.'
        ],
        'lemak' => [
            'required' => 'Lemak harus diisi.',
            'numeric' => 'Lemak harus berupa angka.'
        ],
    ];
}