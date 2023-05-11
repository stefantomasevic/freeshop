import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.apiUrl;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) {

  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    getCategories(): Observable<Category[]> {
        console.log(this.httpClient.get<Category[]>(this.baseUrl + '/categories'));
        return this.httpClient.get<Category[]>(this.baseUrl + '/categories');
    }

    getCategory(id: number): Observable<Category> {
        return this.httpClient.get<Category>(this.baseUrl + '/categories/' + id);
    }

    saveCategory(category: Category): Observable<Category> {
        if (category.id >= 0 && category.name.length > 2) {
            return this.httpClient.post<Category>(this.baseUrl + '/categories', category);
        }

        this._snackBar.open('Nisu popunjeni svi podaci!', 'x', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000 //2 sekunde
        });
        return null;

    }

    deleteCategory(id: any): Observable<any> {
        return this.httpClient.delete(this.baseUrl + '/categories/' + id);
      }
}
