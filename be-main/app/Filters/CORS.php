<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class CORS implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Set header untuk mengizinkan akses dari semua domain
        header("Access-Control-Allow-Origin: *");
        
        // Set header untuk mengizinkan tipe konten dan metode permintaan yang diizinkan
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, PUT, DELETE");
        
        // Set header untuk mengizinkan pengiriman cookie dalam permintaan lintas domain
        header("Access-Control-Allow-Credentials: true");
        
        // Set header untuk mengizinkan cache pra-fetch untuk permintaan OPTIONS
        header('Access-Control-Max-Age: 86400');

        // Jika metode permintaan adalah OPTIONS, langsung kirim tanggapan dan hentikan eksekusi lebih lanjut
        if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
            header('Content-Length: 0');
            header('Content-Type: application/json; charset=UTF-8');
            exit();
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak ada tindakan setelah permintaan selesai
    }
}
