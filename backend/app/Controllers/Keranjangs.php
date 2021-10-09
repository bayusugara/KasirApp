<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;
use App\Models\CategoryModel;
use App\Models\KeranjangModel;

class Keranjangs extends ResourceController
{
    use ResponseTrait;
    // get all product
    public function index()
    {
        $model = new KeranjangModel();
        $data = $model->tampil()->getResult();
        return $this->respond($data, 200);
    }

    // get single product
    public function show($id = null)
    {
        $model = new KeranjangModel();
        $data = $model->getWhere(['id_product' => $id])->getResult();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('No Data Found with id ' . $id);
        }
    }

    // create a product
    public function create()
    {
        $model = new KeranjangModel();
        $data = [
            'jumlah' => $this->request->getPost('jumlah'),
            'total_harga' => $this->request->getPost('total_harga'),
            'id_product' => $this->request->getPost('id_product')
        ];
        $data = json_decode(file_get_contents("php://input"));
        // $data = $this->request->getPost();
        $model->insert($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Data Saved'
            ]
        ];

        return $this->respondCreated($response, 201);
    }

    // update product
    public function update($id = null)
    {
        $model = new KeranjangModel();
        $json = $this->request->getJSON();
        if ($json) {
            $data = [
                'jumlah' => $json->jumlah,
                'total_harga' => $json->total_harga,
                'id_product' => $json->id_product
            ];
        } else {
            $input = $this->request->getRawInput();
            $data = [
                'jumlah' => $input['jumlah'],
                'total_harga' => $input['total_harga'],
                'id_product' => $input['id_product']
            ];
        }
        // Insert to Database
        $model->update($id, $data);
        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respond($response);
    }

    // // delete product
    // public function delete($id = null)
    // {
    //     $model = new ProductModel();
    //     $data = $model->find($id);
    //     if ($data) {
    //         $model->delete($id);
    //         $response = [
    //             'status'   => 200,
    //             'error'    => null,
    //             'messages' => [
    //                 'success' => 'Data Deleted'
    //             ]
    //         ];

    //         return $this->respondDeleted($response);
    //     } else {
    //         return $this->failNotFound('No Data Found with id ' . $id);
    //     }
    // }
}
