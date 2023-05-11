import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/admin/models/category';
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit, OnChanges {

  @Input()
  tempCategory: Category = new Category(0, null, null);

  category: Category = new Category(0, null, null);

  @Output()
  toggleActive = new EventEmitter<boolean>();

  @Output()
  saveCategory = new EventEmitter<Category>();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.categoryService.getCategory(id).subscribe({
        next: p => this.category = p,
        error: err => {
          this._snackBar.open(err.error, 'x', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000
          });

          this.closeAddCategory();
        }
      });
    }


    //this.product = this.productService.getProduct(id) ?? new Product(0, null,null);
  }

  closeAddCategory() {
    this.router.navigate(['admin/category']);
  }

  submit() {
    this.categoryService.saveCategory(this.category).subscribe({
      next: p => this.closeAddCategory(),
      error: err => console.log(err)
    });
  }

  ngOnChanges() {
    this.category = { ...this.tempCategory };
  }

}
