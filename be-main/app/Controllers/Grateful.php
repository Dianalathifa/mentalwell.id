<?php

namespace App\Controllers;

use App\Models\GratefulModel;
use CodeIgniter\RESTful\ResourceController;

class Grateful extends ResourceController
{
    protected $modelName = 'App\Models\GratefulModel';
    protected $format    = 'json';

    public function index()
    {
        $gratefulModel = new GratefulModel();
        $grateful = $gratefulModel->findAll();
        return $this->respond($grateful);
    }

    public function create()
{
    $gratefulModel = new GratefulModel();
    $data = $this->request->getJSON(true);
    
    $id_partisipan = $this->request->getVar('id_partisipan');
    $tanggal = $this->request->getVar('tanggal');
    $hal_disyukuri = $this->request->getVar('hal_disyukuri');

    // Memastikan bahwa ada 5 hal disyukuri
    if (count($hal_disyukuri) !== 5) {
        return $this->failValidationErrors('You must provide 5 things to be grateful for.');
    }

    // Menggabungkan semua hal disyukuri menjadi satu teks
    $hal_disyukuriCombined = implode(', ', $hal_disyukuri);

    // Menyiapkan data untuk disimpan
    $insertData = [
        'id_partisipan' => $id_partisipan,
        'tanggal' => $tanggal,
        'hal_disyukuri' => $hal_disyukuriCombined
    ];

    if ($gratefulModel->insert($insertData)) {
        return $this->respondCreated($data, 'Grateful created');
    } else {
        return $this->failValidationErrors($gratefulModel->errors());
    }
}


    

    public function update($id = null)
    {
        $gratefulModel = new GratefulModel();
        $data = $this->request->getJSON(true);

        if ($gratefulModel->update($id, $data)) {
            return $this->respond($data, 200, 'Grateful updated');
        } else {
            return $this->failValidationErrors($gratefulModel->errors());
        }
    }

    public function delete($id = null)
    {
        $gratefulModel = new GratefulModel();
        
        if ($gratefulModel->delete($id)) {
            return $this->respondDeleted(['id' => $id], 'Grateful deleted');
        } else {
            return $this->failNotFound('No grateful found with id ' . $id);
        }
    }

    public function getByPartisipanId($id_partisipan = null)
{
    $gratefulModel = new GratefulModel();
    
    // Lakukan query untuk mendapatkan data berdasarkan id_partisipan
    $grateful = $gratefulModel->where('id_partisipan', $id_partisipan)->findAll();
    
    if (!empty($grateful)) {
        return $this->respond($grateful);
    } else {
        return $this->failNotFound('No grateful found for partisipan with id ' . $id_partisipan);
    }
}

}
