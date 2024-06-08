<?php

namespace App\Controllers;

use App\Models\JawabanPostTest;
use App\Models\HasilPrediksiPost;
use CodeIgniter\API\ResponseTrait;

class JawabanPostTestController extends BaseController
{
    use ResponseTrait;

    public function saveAnswer()
{
    $jawabanModel = new JawabanPostTest();
    $hasilModel = new HasilPrediksiPost();

    // Ambil data jawaban dari body request
    $requestData = $this->request->getJSON(true);

    // Pastikan atribut 'jawaban' ada dalam data request
    if (!isset($requestData['jawaban'])) {
        return $this->fail('Atribut "jawaban" tidak ditemukan dalam data permintaan.', 400);
    }

    // Hitung total points berdasarkan jawaban yang diberikan
    $totalPoints = 0;
    foreach ($requestData['jawaban'] as $jawaban) {
        $totalPoints += ($jawaban == 1) ? 1 : 0;
    }

    // Format data jawaban sesuai dengan model
    $jawabanData = [
        'id_partisipan' => $requestData['id_partisipan'],
        'headaches' => $requestData['jawaban'][0], // Pertanyaan 1
        'appetite_poor' => $requestData['jawaban'][1], // Pertanyaan 2
        'sleep_badly' => $requestData['jawaban'][2], // Pertanyaan 3
        'easily_frightened' => $requestData['jawaban'][3], // Pertanyaan 4
        'hands_shake' => $requestData['jawaban'][4], // Pertanyaan 5
        'nervous' => $requestData['jawaban'][5], // Pertanyaan 6
        'digestion_poor' => $requestData['jawaban'][6], // Pertanyaan 7
        'thinking_clearly' => $requestData['jawaban'][7], // Pertanyaan 8
        'unhappy' => $requestData['jawaban'][8], // Pertanyaan 9
        'cry' => $requestData['jawaban'][9], // Pertanyaan 10
        'difficult_enjoy_activities' => $requestData['jawaban'][10], // Pertanyaan 11
        'difficult_make_decisions' => $requestData['jawaban'][11], // Pertanyaan 12
        'work_suffering' => $requestData['jawaban'][12], // Pertanyaan 13
        'unable_useful' => $requestData['jawaban'][13], // Pertanyaan 14
        'lost_interest' => $requestData['jawaban'][14], // Pertanyaan 15
        'worthless_person' => $requestData['jawaban'][15], // Pertanyaan 16
        'ending_life' => $requestData['jawaban'][16], // Pertanyaan 17
        'tired' => $requestData['jawaban'][17], // Pertanyaan 18
        'easily_tired' => $requestData['jawaban'][18], // Pertanyaan 19
        'uncomfortable_stomach' => $requestData['jawaban'][19], // Pertanyaan 20
    ];

    // Simpan jawaban ke dalam database
    $saved = $jawabanModel->save($jawabanData);

    if ($saved) {
        // Tentukan apakah terdapat mental disorders
        $mentalDisorders = ($totalPoints > 6) ? true : false;

        // Klasifikasi berdasarkan kondisi mental
        $klasifikasi = ($mentalDisorders) ? $this->classifyPenyakit($jawabanData, $mentalDisorders) : 'Tidak Menderita';

        // Persiapkan data untuk penyimpanan ke database
        $newData = [
            'points' => $totalPoints,
            'mental_disorders' => $mentalDisorders,
            'klasifikasi' => $klasifikasi,
            'tanggal_tes' => date('Y-m-d')
        ];

        // Simpan hasil prediksi ke dalam database
        $hasilModel->insertPrediction($requestData['id_partisipan'], $newData);

        return $this->respondCreated(['message' => 'Jawaban berhasil disimpan dan diklasifikasikan']);
    } else {
        return $this->fail('Gagal menyimpan jawaban', 500);
    }
}


    // Fungsi untuk mengambil jawaban
    public function getAnswers()
    {
        $jawabanModel = new JawabanPostTest();

        // Ambil semua data jawaban dari database
        $answers = $jawabanModel->findAll();

        if ($answers) {
            return $this->respond($answers);
        } else {
            return $this->fail('Data jawaban tidak ditemukan', 404);
        }
    }

    private function prepareData($data)
    {
        // Modifikasi data sesuai kebutuhan, misalnya isi null dengan 0
        foreach ($data as $key => $value) {
            $data[$key] = $value ?? 0;
        }
        return $data;
    }

    private function classify($data)
    {
        // Implementasikan logika klasifikasi di sini
        // Untuk kesederhanaan, kita kembalikan nilai acak untuk mental_disorders
        return rand(0, 1); // Ganti ini dengan logika klasifikasi yang sebenarnya
    }

    private function classifyPenyakit($data, $mentalDisorder)
    {
        $kriteriaDepresi = ['appetite_poor', 'sleep_badly', 'thinking_clearly', 'unhappy', 'cry', 
                            'difficult_make_decisions', 'unable_useful', 'lost_interest', 'worthless_person', 
                            'ending_life', 'tired', 'uncomfortable_stomach', 'work_suffering'];
        $kriteriaCemas = ['easily_frightened', 'hands_shake', 'nervous', 'worthless_person'];
        $kriteriaStress = ['headaches', 'digestion_poor', 'easily_tired'];

        $countDepresi = count(array_filter($kriteriaDepresi, fn($key) => $data[$key] == 1));
        $countCemas = count(array_filter($kriteriaCemas, fn($key) => $data[$key] == 1));
        $countStress = count(array_filter($kriteriaStress, fn($key) => $data[$key] == 1));

        if ($mentalDisorder == 0) {
            return 'Tidak Menderita';
        }

        $maxCount = max($countDepresi, $countCemas, $countStress);

        if ($maxCount == $countDepresi) {
            return 'Depresi';
        } elseif ($maxCount == $countCemas) {
            return 'Cemas';
        } elseif ($maxCount == $countStress) {
            return 'Stress';
        }

        return 'Belum Diklasifikasikan';
    }
}
