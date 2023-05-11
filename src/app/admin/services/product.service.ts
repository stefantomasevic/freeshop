import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../models/category";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = environment.apiUrl;

    constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) {

    }

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.baseUrl + '/products');
    }

    getProduct(id: number): Observable<Product> {
        return this.httpClient.get<Product>(this.baseUrl + '/products/' + id);
    }

    saveProduct(product: Product): Observable<Product> {
        if (product.id >= 0 && product.title.length > 2) {
            return this.httpClient.post<Product>(this.baseUrl + '/products', product);
        }

        this._snackBar.open('Nisu popunjeni svi podaci!', 'x', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000 //2 sekunde
        });
        return null;

    }
    getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(this.baseUrl + '/categories');
    }
}
