<?php

namespace App\Models;

use CodeIgniter\Model;

class KategoriTestModel extends Model
{
    protected $table      = 'kategori_test';
    protected $primaryKey = 'id_test';
    protected $returnType     = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['nama_test', 'deskripsi_test', 'sub_test']; // Hapus 'created_at' dan 'updated_at'

    protected $useTimestamps = false; // Menonaktifkan penggunaan timestamp

    protected $skipValidation     = false;

    // Callbacks dan metode lainnya tetap sama seperti sebelumnya
}