<?php

namespace App\Controllers;

use App\Models\JawabanDASSCemas;
use CodeIgniter\API\ResponseTrait;

class DassCemas extends BaseController
{
    use ResponseTrait;

    public function saveAnswer()
    {
        $jawabanModel = new JawabanDASSCemas();

        // Ambil data jawaban dari body request
        $requestData = $this->request->getJSON(true);

        // Pastikan atribut 'jawaban' ada dalam data request
        if (!isset($requestData['jawaban'])) {
            return $this->fail('Atribut "jawaban" tidak ditemukan dalam data permintaan.', 400);
        }

        // Hitung skor DASS-Stress
        $totalScore = array_sum($requestData['jawaban']);

        // Klasifikasi hasil
        $classification = '';
        if ($totalScore >= 0 && $totalScore <= 7) {
            $classification = 'Kecemasan Normal';
        } elseif ($totalScore >= 8 && $totalScore <= 9) {
            $classification = 'Kecemasan Ringan';
        } elseif ($totalScore >= 10 && $totalScore <= 14) {
            $classification = 'Kecemasan Sedang';
        } elseif ($totalScore >= 15 && $totalScore <= 19) {
            $classification = 'Kecemasan Parah';
        } else {
            $classification = 'Kecemasan Sangat Parah';
        }

        // Format data jawaban sesuai dengan model
        $jawabanData = [
            'id_partisipan' => $requestData['id_partisipan'],
            'question_1' => $requestData['jawaban'][0],
            'question_2' => $requestData['jawaban'][1],
            'question_3' => $requestData['jawaban'][2],
            'question_4' => $requestData['jawaban'][3],
            'question_5' => $requestData['jawaban'][4],
            'question_6' => $requestData['jawaban'][5],
            'question_7' => $requestData['jawaban'][6],
            'question_8' => $requestData['jawaban'][7],
            'question_9' => $requestData['jawaban'][8],
            'question_10' => $requestData['jawaban'][9],
            'question_11' => $requestData['jawaban'][10],
            'question_12' => $requestData['jawaban'][11],
            'question_13' => $requestData['jawaban'][12],
            'question_14' => $requestData['jawaban'][13],
            'total_score' => $totalScore,
            'classification' => $classification,
            // Masukkan total skor dan klasifikasi ke dalam database
            'points' => $totalScore,
            'klasifikasi' => $classification,
        ];
        

        // Simpan jawaban ke dalam database
        $saved = $jawabanModel->save($jawabanData);

        if ($saved) {
            return $this->respondCreated(['message' => 'Jawaban berhasil disimpan', 'total_score' => $totalScore, 'classification' => $classification]);
        } else {
            return $this->fail('Gagal menyimpan jawaban', 500);
        }
    }

    // Function untuk mengambil jawaban
    public function getAnswers()
    {
        $jawabanModel = new JawabanDASSCemas();

        // Ambil semua data jawaban dari database
        $answers = $jawabanModel->findAll();

        if ($answers) {
            return $this->respond($answers);
        } else {
            return $this->fail('Data jawaban tidak ditemukan', 404);
        }
    }
    public function getAnswerByIdPartisipan($id_partisipan)
{
    $jawabanModel = new JawabanDASSCemas();

    // Ambil data jawaban dari database berdasarkan id_partisipan
    $answer = $jawabanModel->where('id_partisipan', $id_partisipan)->first();

    if ($answer) {
        // Format data jawaban sesuai yang diinginkan
        $formattedAnswer = [
            'id_partisipan' => $answer['id_partisipan'],
            'points' => $answer['points'],
            'klasifikasi' => $answer['klasifikasi']
        ];
        return $this->respond($formattedAnswer);
    } else {
        return $this->fail('Data jawaban tidak ditemukan', 404);
    }
}
}

