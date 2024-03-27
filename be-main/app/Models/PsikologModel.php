<?php

namespace App\Models;

use CodeIgniter\Model;

class PsikologModel extends Model
{
    protected $table      = 'psikolog';
    protected $primaryKey = 'id_psikolog';
    protected $returnType     = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['nama_psikolog', 'deskripsi_psikolog', 'image_psikolog', 'lokasi_psikolog', 'telephone_psikolog'];

    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $dateFormat = 'datetime';
    protected $skipValidation     = false;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
