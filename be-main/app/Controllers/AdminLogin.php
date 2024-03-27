<?php

namespace App\Controllers;

use App\Models\AdminModel;
use CodeIgniter\API\ResponseTrait;

class AdminLogin extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        helper(['form']);
        // Tampilkan halaman login admin
        echo view('admin_login');
    }

    public function auth()
    {
        $session = session();
        $model = new AdminModel();
        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');
        $data = $model->where('username', $username)->first();
        
        if($data){
            // Jika data admin ditemukan
            $pass = $data['password'];
            $verify_pass = password_verify($password, $pass);
            
            if($verify_pass){
                // Jika password cocok, set session data
                $ses_data = [
                    'id'        => $data['id'],
                    'username'  => $data['username'],
                    'logged_in' => TRUE
                ];
                $session->set($ses_data);
                
                // Redirect ke halaman admin
                return redirect()->to('/admin/dashboard');
            } else {
                // Jika password tidak cocok, kirim pesan kesalahan
                return $this->fail('Wrong Password', 401);
            }
        } else {
            // Jika username tidak ditemukan, kirim pesan kesalahan
            return $this->fail('Username not Found', 404);
        }
    }

    public function logout()
    {
        $session = session();
        $session->destroy();
        
        // Redirect ke halaman login admin setelah logout
        return redirect()->to('/admin/login');
    }
}
