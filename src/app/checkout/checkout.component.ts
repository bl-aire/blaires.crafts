import { Component, Input, OnInit } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3"
import { CartService } from '../_shared/services/cart.service';
import { IProduct } from '../products/product';
import { ProductsComponent } from '../products/products.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../contact/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  //@Input() product!: IProduct[];
  product: IProduct[] = [];

  FormData!: FormGroup


  orderCounter: number ;

  publicKey = "FLWPUBK_TEST-08976f7d01df473244698700d4cd64e7-X";

  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}
 
  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}
 
  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }

  items: IProduct[] = [];

  constructor(private flutterwave: Flutterwave, private cartService: CartService,  private builder: FormBuilder, private dataService: DataService) { 
    this.orderCounter = 0; 
  }

  ngOnInit() {
    this.items = this.cartService.getCartItems();

    this.FormData = this.builder.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),//[Validators.compose([Validators.required, Validators.email])]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    })
  }

  makePayment(){
    this.flutterwave.inlinePay(this.paymentData)
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Payment callback", response);
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(){
    let date = new Date()
    return date.getTime().toString();
  }

  clearCart() {
    this.cartService.clearCart()
  }

  removeItem(product: IProduct[]) {
    this.cartService.removeItem(product);
  }

  total(){
    this.cartService.total();
  }
 
  increaseOrderCounter() {
    this.orderCounter += 1;
  }

  decreaseOrderCounter() {
    this.orderCounter -= 1;
  }

  onSubmit(FormData: any) {
    console.log(FormData)
    this.dataService.postContactForm(FormData).subscribe(
      (response: any) => {
      location.href = 'https://mailthis.to/confirm'
      console.log(response)
    }, (error: { responseText: any; }) => {
      console.warn(error.responseText)
      console.log({ error })
    })
  }
}

