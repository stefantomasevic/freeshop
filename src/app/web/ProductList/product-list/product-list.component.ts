import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/admin/models/category';
import { Product } from 'src/app/admin/models/product';
import { ProductService } from 'src/app/admin/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  price: number = 0;
  maxPrice: number = 0;
  products: Product[] = [];
  productsObservable: Observable<Product[]>;
  filteredProducts: Product[] = [];
  categories:Category[]=[];
  displayedColumns = ['id', 'name', 'price'];
  searchTerm: string = ''; 


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    
    this.getProducts();
     this.getCategories();
  }
  

  getProducts() {
    this.productsObservable = this.productService.getProducts();
    
    this.productsObservable.subscribe({
    next: products => {
      this.products = products;
      this.filteredProducts=this.products;
      const maxPriceProduct = this.products.reduce((acc, product) => {
        return product.price > acc.price ? product : acc;
      });
      
      console.log("test"+maxPriceProduct);
      this.maxPrice = maxPriceProduct.price;
      this.price = this.maxPrice;
    },
    error: error => {
      console.log(error);
    }
  });
    
  }

  getCategories(){
    this.productService.getCategories().subscribe({
      next: category => {
        this.categories = category;
        console.log(category);
      },
      error: error => {
        console.log(error);
      }
    });
  }
 

  updatePrice(newPrice: string) {
    this.price = parseInt(newPrice);
    this.filterProducts();
  }

  filterProducts() {
    console.log(this.searchTerm);
    if (this.searchTerm === ''&& this.price == 0) {
      this.filteredProducts=this.products;
      return;
    }
    this.filteredProducts = this.products.filter(product => {
    const name = product.title.toLowerCase();
    return (this.searchTerm == '' || name.includes(this.searchTerm)) &&((this.price == 0 || product.price < this.price));
  });

    
  }
  

}


