<?php

namespace App\Models;

use CodeIgniter\Model;

class JawabanModel extends Model
{
    protected $table = 'jawaban';
    protected $primaryKey = 'id_jawaban';
    protected $allowedFields = ['id_partisipan', 'id_kuisioner', 'jawaban'];

    public function saveAnswer($participantId, $kuisionerId, $answer)
    {
        $data = [
            'id_partisipan' => $participantId,
            'id_kuisioner' => $kuisionerId,
            'jawaban' => $answer
        ];

        return $this->insert($data);
    }
}
