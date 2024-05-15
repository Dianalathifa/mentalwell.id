<?php

namespace App\Models;

use CodeIgniter\Model;

class JawabanDASSDepresi extends Model
{
    protected $table = 'jawaban_dass_depresi';
    protected $primaryKey = 'id_jawaban';
    protected $allowedFields = ['id_partisipan', 'question_1', 'question_2', 'question_3', 'question_4', 'question_5', 'question_6', 'question_7', 'question_8', 'question_9', 'question_10', 'question_11', 'question_12', 'question_13', 'question_14', 'points', 'klasifikasi'];

    public function saveJawaban($data)
    {
        // Masukkan data jawaban ke dalam database
        return $this->insert($data);
    }
}
