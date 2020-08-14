import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }


  //metodos
  getProducts() {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      stock: product.stock
    });
  }

  updateProduct(product: Product) {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      stock: product.stock
    });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
