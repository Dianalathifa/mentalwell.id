<?php

namespace App\Models;

use CodeIgniter\Model;

class JawabanIntervensiModel extends Model
{
    protected $table = 'jawaban_intervensi'; // Nama tabel yang sesuai dengan struktur database
    protected $primaryKey = 'id_jawaban_intervensi'; // Nama kolom primary key
    protected $allowedFields = ['id_intervensi', 'id_partisipan', 'respon','tanggal_submit', 'created_at']; // Kolom yang diizinkan untuk diisi

    // Format waktu untuk kolom created_at
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';

    // Aturan validasi untuk setiap kolom saat menambahkan atau memperbarui data
    protected $validationRules = [
        'id_intervensi' => 'required|integer',
        'respon' => 'required',
    ];

    // Pesan kesalahan validasi yang sesuai
    protected $validationMessages = [
        'id_intervensi' => [
            'required' => 'ID Intervensi harus diisi.',
            'integer' => 'ID Intervensi harus berupa bilangan bulat.',
        ],
        'respon' => [
            'required' => 'Response harus diisi.',
        ],
    ];

    // Mengatur mode pengembalian data
    protected $returnType = 'array';

    // Mengembalikan tanggal dalam format yang sudah diformat
    protected $useSoftDeletes = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = '';
    protected $deletedField  = '';
    protected $skipValidation     = false;

    // Relasi dengan tabel intervensi jika diperlukan
    // public function intervensi()
    // {
    //     return $this->belongsTo(IntervensiModel::class, 'id_intervensi');
    // }

    // Relasi dengan tabel users jika diperlukan
    // public function user()
    // {
    //     return $this->belongsTo(UserModel::class, 'id_user');
    // }
}
