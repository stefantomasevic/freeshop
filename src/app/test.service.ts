import { Injectable } from '@angular/core';
import { Product } from './admin/models/product';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private data: any[] = [];

  constructor() { }

  getData(): any[] {
    return this.data;
  }

  addData(newData: any): void {
    this.data.push(newData);
    console.log(this.data);
  }

  removeData(index: number): void {
    this.data.splice(index, 1);
  }

}
