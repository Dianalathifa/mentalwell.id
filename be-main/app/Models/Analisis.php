<?php

namespace App\Models;

use CodeIgniter\Model;

class Analisis extends Model
{
    protected $table = 'analisis';
    protected $primaryKey = 'id_analisis';
    protected $allowedFields = ['id_partisipan', 'headaches', 'appetite_poor', 'sleep_badly', 'easily_frightened', 'hands_shake', 'nervous', 'digestion_poor', 'thinking_clearly', 'unhappy', 'cry', 'difficult_enjoy_activities', 'difficult_make_decisions', 'work_suffering', 'unable_useful', 'lost_interest', 'worthless_person', 'ending_life', 'tired', 'easily_tired', 'uncomfortable_stomach', 'points', 'mental_disorders', 'klasifikasi'];

    public function saveJawaban($data)
    {
        // Masukkan data jawaban ke dalam database
        return $this->insert($data);
    }
}
