<?php

namespace App\Controllers;

use App\Models\JawabanSRQ;
use App\Models\Analisis;
use CodeIgniter\API\ResponseTrait;

class JawabanSRQController extends BaseController
{
    use ResponseTrait;

    public function saveAnswer()
    {
        $jawabanModel = new JawabanSRQ();
        $analisisModel = new Analisis();

        // Ambil data jawaban dari body request
        $requestData = $this->request->getJSON(true);

        // Pastikan atribut 'jawaban' ada dalam data request
        if (!isset($requestData['jawaban'])) {
            return $this->fail('Atribut "jawaban" tidak ditemukan dalam data permintaan.', 400);
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

        // Simpan jawaban ke dalam model JawabanSRQ
        $saved = $jawabanModel->save($jawabanData);

        if ($saved) {
            // Simpan juga jawaban ke dalam model Analisis
            $analisisModel->save($jawabanData);

            return $this->respondCreated(['message' => 'Jawaban berhasil disimpan']);
        } else {
            return $this->fail('Gagal menyimpan jawaban', 500);
        }
    }
    // Function untuk mengambil jawaban
    public function getAnswers()
    {
        $jawabanModel = new JawabanSRQ();

        // Ambil semua data jawaban dari database
        $answers = $jawabanModel->findAll();

        if ($answers) {
            return $this->respond($answers);
        } else {
            return $this->fail('Data jawaban tidak ditemukan', 404);
        }
    }
}
