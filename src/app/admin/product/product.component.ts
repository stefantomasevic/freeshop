import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product(0, null, null);
  products: Product[] = [];
  productsObservable: Observable<Product[]>;

  toggleProductDetails: boolean = false;
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addProduct() {
    this.router.navigate(['admin/product/add']);
  }

  edit(product: Product) {
    this.router.navigate(['admin/product/edit/' + product.id]);
  }

  closeEditForm(value: boolean) {
    this.toggleProductDetails = value;
  }

  getProducts() {
/*
    this.productService.getProducts().subscribe({
      next: p => this.products = p,
      error: err => console.log(err)
    });
*/

    this.productsObservable = this.productService.getProducts();

  }

}
