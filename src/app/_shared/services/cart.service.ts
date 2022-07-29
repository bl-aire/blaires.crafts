import { Injectable, Input } from '@angular/core';
import { IProduct } from 'src/app/products/product';
import { ProductsComponent } from 'src/app/products/products.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items:IProduct[] = [];

  constructor() {}

  /*addToCart(product: IProduct) {
    this.items.push(product);
  }*/

  addItem(product: IProduct) {
    const itemExists = this.items.find(({productName}) => productName === product.productName);
    if(!itemExists) {
      this.items.push({...product, num:1});
      localStorage.setItem('item', JSON.stringify(this.items));
      window.alert('Your product has been added to the cart!');
      return;
    }
    itemExists.num += 1;
    window.alert('This product already exists in the cart!');
      
  }

  /*getItems() {
    return this.items;
  }

  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem('cart_items')) ?? [];
  }*/

  getCartItems() {
    return this.items = JSON.parse(localStorage.getItem('item') || '{}');
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  total() {
    return this.items.reduce((sum, prod) => sum += prod.num , 0)
  }
}


function item(item: any, arg1: string) {
  throw new Error('Function not implemented.');
}

