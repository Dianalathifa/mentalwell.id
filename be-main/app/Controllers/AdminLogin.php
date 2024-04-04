<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\AdminModel;

class AdminLogin extends BaseController
{
    use ResponseTrait;

    protected $format = 'json';

    public function login()
    {
        // Ambil data JSON dari permintaan
        $jsonData = $this->request->getJSON();

        // Validasi apakah data JSON lengkap
        if (!$jsonData || !isset($jsonData->email_admin) || !isset($jsonData->password_admin)) {
            $response = [
                'code' => 400,
                'status' => 'failed',
                'message' => 'Incomplete data',
            ];
            return $this->respond($response, 400);
        }
        
        // Ambil email dan password dari data JSON
        $email_admin = $jsonData->email_admin;
        $password_admin = $jsonData->password_admin;

        // Cari admin berdasarkan email
        $adminModel = new AdminModel();
        $admin = $adminModel->where('email_admin', $email_admin)->first();

        // Periksa apakah admin ditemukan
        if ($admin === null) {
            // Admin tidak ditemukan
            $response = [
                'code' => 401,
                'status' => 'failed',
                'message' => 'Admin not registered',
            ];
        } else {
            // Periksa kecocokan password
            if (password_verify($password_admin, $admin['password_admin'])) {
                // Password cocok, set session
                $session = session();
                $session->set('admin_id', $admin['id_admin']);
                $session->set('admin_email', $admin['email_admin']);

                // Kirim respons sukses
                $response = [
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'Login successfully',
                    'admin_id' => $admin['id_admin'],
                    'admin_nama' => $admin['nama_admin'], 
                    'admin_email' => $admin['email_admin'],
                ];
            } else {
                // Password tidak cocok
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
