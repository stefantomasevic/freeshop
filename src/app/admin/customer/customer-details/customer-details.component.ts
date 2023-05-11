import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/admin/models/customer';
import { CustomerService } from 'src/app/admin/services/customer.service';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnChanges {

  tempCustomer: Customer = new Customer(0, null, null);
  
  customer: Customer = new Customer(0, null, null);

  @Output()
  toggleActive = new EventEmitter<boolean>();

  @Output()
  saveCustomer = new EventEmitter<Customer>();

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.customerService.getCustomer(id).subscribe({
        next: c => this.customer = c,
        error: err => {
          this._snackBar.open(err.error, 'x', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000
          });

          this.closeAddCustomer();
        }
      });
    }
  }

  closeAddCustomer() {
    this.router.navigate(['admin/customer']);
  }

  submit() {
    this.customerService.saveCustomer(this.customer).subscribe({
      next: c => this.closeAddCustomer(),
      error: err => console.log(err)
    });
  }

  ngOnChanges() {
    this.customer = { ...this.tempCustomer };
  }

  
}
