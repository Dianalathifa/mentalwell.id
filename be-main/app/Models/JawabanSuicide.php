<?php

namespace App\Models;

use CodeIgniter\Model;

class JawabanSuicide extends Model
{
    protected $table = 'jawaban_suicide';
    protected $primaryKey = 'id_jawaban';
    protected $allowedFields = ['id_partisipan', 'question_1', 'question_2', 'question_3', 'question_4', 'question_5', 'question_6', 'question_7', 'question_8', 'question_9', 'question_10', 'points', 'klasifikasi','tanggal_tes'];

    public function saveJawaban($data)
    {
        // Masukkan data jawaban ke dalam database
        return $this->insert($data);
    }
}
