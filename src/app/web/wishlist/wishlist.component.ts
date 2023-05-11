import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../admin/models/product';
import { ProductService } from '../../admin/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products: Product[] = [];
  productsObservable: Observable<Product[]>;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    
  this.productsObservable = this.productService.getProducts();
}

  addToCart(newProduct: Product){
    this.products.push(newProduct);
    console.log(this.products);
  }

  removeFromCart(productToRemove: Product){
    this.products = this.products.filter(function(e) { return e !== productToRemove });
    console.log(this.products);
  }

}
