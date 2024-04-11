<?php

namespace App\Controllers;

use App\Models\JawabanModel;
use CodeIgniter\API\ResponseTrait;

class JawabanController extends BaseController
{
    use ResponseTrait;

    protected $jawabanModel;

    public function __construct()
    {
        $this->jawabanModel = new JawabanModel();
    }

    public function save()
    {
        // Ambil data partisipan yang login
        $participantId = session()->get('id_partisipan'); // Menggunakan session partisipan yang telah login

        // Ambil data kuisioner yang diisi oleh partisipan
        $kuisionerId = $this->request->getPost('id_kuisioner');
        $answer = $this->request->getPost('jawaban');

        // Simpan jawaban ke dalam database
        $saved = $this->answerModel->saveAnswer($participantId, $kuisionerId, $answer);

        if ($saved) {
            return $this->respondCreated(['message' => 'Jawaban berhasil disimpan.']);
        } else {
            return $this->failServerError();
        }
    }
}
