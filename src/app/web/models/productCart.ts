export class ProductCart {
    id:number;
    title: string;
    price:number;
    quantity:number;

    constructor(id: number, title: string, price:number,quantity:number) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.quantity=quantity;
    }

    totalPrice():number{
        return this.price*this.quantity;
    }
  }