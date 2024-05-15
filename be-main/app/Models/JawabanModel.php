<?php

namespace App\Models;

use CodeIgniter\Model;

class JawabanModel extends Model
{
    protected $table = 'jawaban'; // Nama tabel di database
    protected $primaryKey = 'id_jawaban_test'; // Primary key tabel

    protected $allowedFields = ['id_partisipan', 'id_kuisioner', 'jawaban']; // Kolom yang dapat diisi

    protected $useTimestamps = true; // Menggunakan timestamp untuk created_at dan updated_at

    protected $createdField = 'created_at'; // Nama kolom untuk timestamp created_at
    protected $updatedField = 'updated_at'; // Nama kolom untuk timestamp updated_at

    public function saveJawaban($idPartisipan, $idKuisioner, $jawaban)
    {
        // Simpan jawaban ke dalam database
        try {
            $this->save([
                'id_partisipan' => $idPartisipan,
                'id_kuisioner' => $idKuisioner,
                'jawaban' => $jawaban
            ]);

            // Berhasil menyimpan jawaban
            return true;
        } catch (\Exception $e) {
            // Tangkap kesalahan dan tampilkan pesan kesalahan
            return false;
        }
    }
}