<?php

namespace App\Models;

use CodeIgniter\Model;

class CemasRinganProgress extends Model
{
    protected $table = 'cemas_ringan_progress';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_partisipan', 'hari', 'status','tanggal'];

    public function getChecklistByUser($partisipanId)
    {
        return $this->where('id_partisipan', $partisipanId)->findAll();
    }

    public function getChecklistByDay($partisipanId, $day)
    {
        return $this->where(['id_partisipan' => $partisipanId, 'hari' => $day])->first();
    }
}
?>
