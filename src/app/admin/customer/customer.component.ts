import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer = new Customer(0, null, null);
  customers: Customer[] = [];
  customerObservable: Observable<Customer[]>;

  toggleCustomerDetails: boolean = false;
  displayedColumns = ['id', 'firstName', 'lastName', 'action', 'delete' ]

  constructor(
    private customerService: CustomerService, private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  addCustomer() {
    this.router.navigate(['admin/customer/add']);
  }

  edit(customer: Customer) {
    this.router.navigate(['admin/customer/edit/' + customer.id]);
  }

  closeEditForm(value: boolean) {
    this.toggleCustomerDetails = value;
  }

  getCustomers() {
    this.customerObservable = this.customerService.getCustomers();
  }
  delete(customer: Customer) {
    this.customerService.deleteCustomer(customer.id).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['admin/customer']);
        },
    );
  }
}
