import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Product } from 'src/app/admin/models/product';
import { ProductService } from 'src/app/admin/services/product.service';
import { TestService } from 'src/app/test.service';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
   
  @Input() product: any;
  data: any[];
  quantity = 1;
  images = [
    'https://www.savjetodavna.hr/wp-content/uploads/2017/05/1jagoda2952017-2.jpg',
    'https://valjevo.rs/Dokumenta/GradValjevo/!%20Slike/galerije/priroda/brda_sume_i_pasnjaci450.jpg',
    'https://www.savjetodavna.hr/wp-content/uploads/2017/05/1jagoda2952017-2.jpg',
    'https://valjevo.rs/Dokumenta/GradValjevo/!%20Slike/galerije/priroda/brda_sume_i_pasnjaci450.jpg'
  ];

  
  productId:number=null;
  constructor(config: NgbCarouselConfig,private productService: ProductService,private route: ActivatedRoute,private dataService:TestService) { 
    config.interval = 3000; // vreme između prelaza
    config.wrap = true; // vracanje na pocetak slajdera
    config.keyboard = false; // za tastaturu
    config.pauseOnHover = false;
    this.product = new Product(null,'',null);
  }

  ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.productId = +params['id'];
        });
       
        this.getProductById(this.productId);
        
        
        this.data = this.dataService.getData();
        console.log(this.data);
  }

  getProductById(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
        // console.log(product);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  addToCart(product: any) {
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    // let quantity = this.quantity || 1; // ako korisnik nije uneo količinu, uzimamo podrazumevanu vrednost 1
    if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += this.quantity;
    } else {
    cartItems.push({ ...product, quantity: this.quantity });
    }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}







