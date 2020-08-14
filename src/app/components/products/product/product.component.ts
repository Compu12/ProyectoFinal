import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

//SERVICIO

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  productService: ProductService;
  
 
  constructor() { }
  ngOnInit(): void {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm){
    this.productService.insertProduct(productForm.value);
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm){
    if(productForm!=null)
    productForm.reset();
    this.productService.selectedProduct = new Product();
  } 

}
//primero tienes que hacer un comit de todo esto no creo que tienes iniciado secion 
//sesion de q o donde?
//del github
//debo tener abierto ??
//x q no he cerrado sesion