<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Config\Services;

class Auth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $session = Services::session();

        // Jika pengguna belum login
        if (!$session->get('logged_in')) {
            // Redirect ke halaman login
            return redirect()->to('/login');
        }

        // Periksa apakah pengguna adalah admin atau partisipan
        $role = $session->get('role');

        // Jika pengguna adalah admin
        if ($role === 'admin') {
            // Lakukan verifikasi autentikasi admin di sini
            // Misalnya, Anda dapat memeriksa apakah pengguna memiliki akses admin
        } 
        // Jika pengguna adalah partisipan
        elseif ($role === 'partisipan') {
            // Lakukan verifikasi autentikasi partisipan di sini
            // Misalnya, Anda dapat memeriksa apakah pengguna memiliki akses partisipan
        }

        // Lanjutkan eksekusi permintaan
        return;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Lakukan sesuatu di sini setelah eksekusi permintaan
    }
}
