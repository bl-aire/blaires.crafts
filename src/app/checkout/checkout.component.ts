import { Component, Input, OnInit } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3"
import { CartService } from '../_shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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

  items = this.cartService.getItems();


  constructor(private flutterwave: Flutterwave, private cartService: CartService) { 
    this.orderCounter = 0; 
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

  increaseOrderCounter() {
    this.orderCounter += 1;
  }

  decreaseOrderCounter() {
    this.orderCounter -= 1;
  }

}

