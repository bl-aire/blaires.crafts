import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { CartService } from '../_shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy{

  clickState: number = 0;
  pageTitle: string = 'Product List';
  imageWidth: number = 200;
  imageMargin: number = 20;
  //showImage: boolean = false;
  errorMessage: string = '';
  sub: Subscription | any;
  badgeNumber: number;


  showFiller = false;

  private _listFilter:string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService, private cartService: CartService ) {
    this.badgeNumber = 0; 
  }

  performFilter(filterBy: string):IProduct[]{
    filterBy = filterBy.toLocaleLowerCase(); //so its not case sensitive
    return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {

    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products; //shows in the same order it is in the products.json
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    //this.listFilter = 'cart';

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

 

  checkout(product: IProduct) {
    this.cartService.addItem(product)
    this.badgeNumber++
  }
     
  /*increaseCounter() {
    this.badgeNumber++;
  }

  addToCart(product: IProduct){
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }*/

}


function product(product: any, IProduct: any) {
  throw new Error('Function not implemented.');
}

