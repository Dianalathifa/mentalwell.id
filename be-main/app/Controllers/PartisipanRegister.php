<?php

namespace App\Controllers;

use App\Models\PartisipanModel;
use CodeIgniter\API\ResponseTrait;

class PartisipanRegister extends BaseController
{
    use ResponseTrait;

    protected $format = 'json';

    public function register()
    {
        $jsonData = $this->request->getJSON();
        
        $data = [
            'nama_partisipan' => $jsonData->nama_partisipan,
            'email_partisipan' => $jsonData->email_partisipan,
            'password_partisipan' => password_hash($jsonData->password_partisipan, PASSWORD_DEFAULT),
            'usia' => $jsonData->usia,
            'no_telp' => $jsonData->no_telp
        ];

        $model = new PartisipanModel();
        $model->insert($data);

        $response = [
            'status' => 200,
            'message' => 'Partisipan registered successfully',
            'data' => $data
        ];

        return $this->respondCreated($response);
    }
}
