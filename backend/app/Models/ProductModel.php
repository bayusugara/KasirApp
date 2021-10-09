<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table = 'product';
    protected $primaryKey = 'id_product';
    protected $allowedFields = ['kode', 'nama', 'harga', 'is_ready', 'gambar', 'id_category'];

    public function tampil (){
        $this->select('*, category.nama as nam, product.nama as na');
        $this->join('category', 'category.id_category = product.id_category');
        return $this->get();
    }
   public function tampil1 ($id_category){
        $this->select('*, category.nama as nam, product.nama as na');
        $this->where('category.id_category', $id_category);
        $this->join('category', 'category.id_category = product.id_category');
        return $this->get();
    }

}
