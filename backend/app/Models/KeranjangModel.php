<?php

namespace App\Models;

use CodeIgniter\Model;

class KeranjangModel extends Model
{
    protected $table = 'keranjang';
    protected $primaryKey = 'id_keranjang';
    protected $allowedFields = ['jumlah', 'total_harga', 'id_product'];

   public function tampil (){
       $this->select('*');
       $this->join('product', 'product.id_product = keranjang.id_product');
       return $this->get();
   }
//    public function tampil1 ($id_product){
//         $this->select('*, keranjang.id_product as id_ker, product.id_product as id_prod');
//         $this->where('keranjang.id_product', $id_product);
//         $this->join('product', 'product.id_product = keranjang.id_product');
//         return $this->get();
//     }

}
