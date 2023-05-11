import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/admin/models/product';
import { ProductCart } from '../models/productCart';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: ProductCart[] = [];

  
  constructor() { }

  ngOnInit() {
    this.loadCartItems();
    
  }

  loadCartItems() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(this.cartItems);
  }
  updateCartItem() {
    
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

  }
  removeCartItem(id:number) {
    
    
    const index = this.cartItems.findIndex((item: ProductCart) => item.id === id);
    console.log(index);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartItem();
    }

  }
 
}
