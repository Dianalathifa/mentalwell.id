<?php

namespace App\Controllers;

use App\Models\AdminModel;
use CodeIgniter\API\ResponseTrait;

class AdminRegister extends BaseController
{
    use ResponseTrait;

    protected $format = 'json';

    public function register()
    {
        $jsonData = $this->request->getJSON();
        
        $data = [
            'nama_admin' => $jsonData->nama_admin,
            'email_admin' => $jsonData->email_admin,
            'password_admin' => password_hash($jsonData->password_admin, PASSWORD_DEFAULT)
        ];

        $model = new AdminModel();
        $model->insert($data);

        $response = [
            'status' => 200,
            'message' => 'Admin registered successfully',
            'data' => $data
        ];

        return $this->respondCreated($response);
    }
}
