<?php

namespace App\Models;

use CodeIgniter\Model;

class DailyInsightModel extends Model
{
    protected $table = 'daily_insight';
    protected $primaryKey = 'id_daily_insight';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = ['judul_content', 'image', 'video', 'deskripsi', 'tanggal_upload'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'tanggal_upload';
    protected $updatedField = null;
    protected $deletedField = null;

    // Validation rules
    protected $validationRules = [
        'judul_content' => 'required',
        'image' => 'uploaded[image]|max_size[image,1024]|mime_in[image,image/jpg,image/jpeg,image/png]',
        'video' => 'uploaded[video]|max_size[video,10240]|mime_in[video,video/mp4,video/mpeg,video/quicktime]',
        'deskripsi' => 'required',
        'tanggal_upload' => 'required',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert = [];
    protected $afterInsert = [];
    protected $beforeUpdate = [];
    protected $afterUpdate = [];
    protected $beforeFind = [];
    protected $afterFind = [];
    protected $beforeDelete = [];
    protected $afterDelete = [];
}
