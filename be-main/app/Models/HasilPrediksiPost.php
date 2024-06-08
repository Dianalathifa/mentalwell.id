<?php

namespace App\Models;

use CodeIgniter\Model;

class HasilPrediksiPost extends Model
{
    protected $table = 'hasil_prediksi_post';
    protected $primaryKey = 'id_hasil';
    protected $allowedFields = ['id_partisipan', 'points', 'mental_disorders', 'klasifikasi', 'tanggal_tes'];

    public function insertPrediction($id_partisipan, $data)
    {
        $data = [
            'id_partisipan' => $id_partisipan,
            'points' => $data['points'],
            'mental_disorders' => $data['mental_disorders'],
            'klasifikasi' => $data['klasifikasi'],
            'tanggal_tes' => $data['tanggal_tes'],
        ];
        return $this->insert($data);
    }

    public function isExist($id_partisipan)
    {
        return $this->where('id_partisipan', $id_partisipan)->first() != null;
    }
}
