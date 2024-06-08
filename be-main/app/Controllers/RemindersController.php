<?php

namespace App\Controllers;

use App\Models\JadwalKegiatanModel;
use App\Models\JadwalOlahragaModel;
use App\Models\JadwalTidurModel;
use App\Models\TujuanModel;
use App\Models\PolaMakanModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\Response;

class RemindersController extends BaseController
{
    use ResponseTrait;

    public function reminders()
    {
        $today = date('Y-m-d'); // Ambil tanggal hari ini

        // Inisialisasi model
        $jadwalKegiatanModel = new JadwalKegiatanModel();
        $jadwalOlahragaModel = new JadwalOlahragaModel();
        $jadwalTidurModel = new JadwalTidurModel();
        $polaMakanModel = new PolaMakanModel(); // Tambahkan inisialisasi model untuk pola makan

        // Cek jadwal kegiatan pada tanggal hari ini
        $kegiatanHariIni = $jadwalKegiatanModel->where('tanggal', $today)->findAll();
        // Cek jadwal olahraga pada tanggal hari ini
        $olahragaHariIni = $jadwalOlahragaModel->where('tanggal', $today)->findAll();
        // Cek jadwal tidur pada tanggal hari ini
        $tidurHariIni = $jadwalTidurModel->where('tanggal', $today)->findAll();
        // Cek pola makan pada tanggal hari ini
        $polaMakanHariIni = $polaMakanModel->where('tanggal', $today)->findAll();

        // Gabungkan semua jenis jadwal pada tanggal hari ini
        $reminders = array_merge($kegiatanHariIni, $olahragaHariIni, $tidurHariIni, $polaMakanHariIni);

        // Kirim respons HTTP dengan data reminder
        return $this->respond($reminders, Response::HTTP_OK);
    }
}
