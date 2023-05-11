import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category = new Category(0, null, null);
  categories: Category[] = [];
  categoriesObservable: Observable<Category[]>;

  toggleProductDetails: boolean = false;
  displayedColumns = ['id', 'name', 'icon', 'action']

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addCategory() {
    this.router.navigate(['admin/category/add']);
  }

  edit(category: Category) {
    this.router.navigate(['admin/category/edit/' + category.id]);
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

    this.categoriesObservable = this.categoryService.getCategories();
    console.log(this.categoriesObservable);
  }

  deleteCategory(id: any): void {
    console.log(id);
    this.categoryService.deleteCategory(id)
      .subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }

}
