<?php

namespace App\Models;

use CodeIgniter\Model;

class KuisionerModel extends Model
{
    protected $table = 'kuisioner';
    protected $primaryKey = 'id_kuisioner';
    protected $returnType = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['id_kategori', 'pertanyaan']; // Atribut yang diizinkan untuk disimpan

    protected $useTimestamps = false; // Menonaktifkan penggunaan kolom timestamp

    protected $validationRules = [
        'id_kategori' => 'required|integer',
        'pertanyaan' => 'required'
    ]; // Aturan validasi untuk setiap atribut

    protected $validationMessages = [
        'id_kategori' => [
            'required' => 'ID Kategori harus diisi',
            'integer' => 'ID Kategori harus berupa bilangan bulat'
        ],
        'pertanyaan' => [
            'required' => 'Pertanyaan harus diisi'
        ]
    ]; // Pesan kesalahan untuk validasi setiap atribut

    protected $skipValidation = false;

    // Callbacks dan metode lainnya tetap sama seperti sebelumnya
}