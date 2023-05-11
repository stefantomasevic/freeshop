import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProductCart } from '../models/productCart';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.css']
})
export class WebLayoutComponent implements OnInit {

  cartItems: ProductCart[] = [];
  showDiv = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

showCart(): void {
  this.showDiv = !this.showDiv;
  this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  console.log(this.cartItems);
}
getTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < this.cartItems.length; i++) {
    totalPrice += (this.cartItems[i].quantity * this.cartItems[i].price);
  }
  return totalPrice.toFixed(2);
}

}

