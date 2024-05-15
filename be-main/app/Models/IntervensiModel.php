<?php

namespace App\Models;

use CodeIgniter\Model;

class IntervensiModel extends Model
{
    protected $table = 'intervensi'; // Nama tabel yang sesuai dengan skema database
    protected $primaryKey = 'id_intervensi'; // Nama kolom primary key
    protected $allowedFields = ['id_kategori_intervensi', 'deskripsi_challenge', 'image_challenge', 'created_at', 'updated_at']; // Kolom yang diizinkan untuk diisi

    // Format waktu untuk kolom created_at dan updated_at
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';

    // Aturan validasi untuk setiap kolom saat menambahkan atau memperbarui data
    protected $validationRules = [
        'id_kategori_intervensi' => 'required',
        'deskripsi_challenge' => 'required',
        'image_challenge' => 'required',
    ];

    // Pesan kesalahan validasi yang sesuai
    protected $validationMessages = [
        'id_kategori_intervensi' => [
            'required' => 'ID Kategori Intervensi harus diisi.'
        ],
        'deskripsi_challenge' => [
            'required' => 'Deskripsi Challenge harus diisi.'
        ],
        'image_challenge' => [
            'required' => 'Image Challenge harus diisi.'
        ],
    ];

    // Mengatur mode pengembalian data
    protected $returnType = 'array';

    // Mengembalikan tanggal dalam format yang sudah diformat
    protected $useSoftDeletes = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';
    protected $skipValidation     = false;

    // Relasi dengan tabel kategori intervensi jika diperlukan
    // public function kategori()
    // {
    //     return $this->belongsTo(KategoriIntervensiModel::class, 'id_kategori_intervensi');
    // }
}
