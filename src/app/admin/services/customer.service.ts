import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
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
export class CustomerService {

  private baseUrl = environment.apiUrl;

    constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) {

    }

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    getCustomers(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(this.baseUrl + '/customers');
    }

    getCustomer(id: number): Observable<Customer> {
        return this.httpClient.get<Customer>(this.baseUrl + '/customers/' + id);
    }

    saveCustomer(customer: Customer): Observable<Customer> {
        if (customer.id >= 0 && customer.firstName.length > 2 && customer.lastName.length > 2) {
            return this.httpClient.post<Customer>(this.baseUrl + '/customers', customer);
        }

        this._snackBar.open('Nisu popunjeni svi podaci!', 'x', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000
        });
        return null;

    }

    deleteCustomer(id: number): Observable<Customer> {
      return this.httpClient.delete<Customer>(this.baseUrl + '/customers/' + id);
    }
}
