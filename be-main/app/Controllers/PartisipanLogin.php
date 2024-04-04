<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\PartisipanModel;

class PartisipanLogin extends BaseController
{
    use ResponseTrait;

    protected $format = 'json';

    public function login()
    {
        $jsonData = $this->request->getJSON();
        
        $email_partisipan = $jsonData->email_partisipan;
        $password_partisipan = $jsonData->password_partisipan;

        $partisipanModel = new PartisipanModel();
        $partisipan = $partisipanModel->where('email_partisipan', $email_partisipan)->first();

        if ($partisipan === null) {
            // User not found
            $response = [
                'code' => 401,
                'status' => 'failed',
                'message' => 'Partisipan not registered',
            ];
        } else {
            // Check password
            if (password_verify($password_partisipan, $partisipan['password_partisipan'])) {
                // Password is correct
                $session = session();
                $session->set('partisipan_id', $partisipan['id_partisipan']);
                $session->set('partisipan_email', $partisipan['email_partisipan']);

                $response = [
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'Login successfully',
                    'partisipan_id' => $partisipan['id_partisipan'],
                    'partisipan_nama' => $partisipan['nama_partisipan'], 
                    'partisipan_email' => $partisipan['email_partisipan'],
                ];
            } else {
                // Password is incorrect
                $response = [
                    'code' => 401,
                    'status' => 'failed',
                    'message' => 'Login failed, incorrect password',
                ];
            }
        }

        return $this->respond($response);
    }
}
