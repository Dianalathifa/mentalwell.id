<?php

namespace App\Models;

use CodeIgniter\Model;

class HasilSRQ extends Model
{
    protected $table = 'hasil_prediksi'; // Sesuaikan dengan nama tabel di database
    protected $primaryKey = 'id_hasil'; // Sesuaikan dengan nama primary key di tabel
    protected $allowedFields = ['id_partisipan', 'points', 'mental_disorders', 'klasifikasi']; // Sesuaikan dengan kolom yang diizinkan

    public function saveHasilSRQ($data)
    {
        // Masukkan data hasil SRQ ke dalam database
        return $this->insert($data);
    }
}
