import { Component, OnInit } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  publicKey = "FLWPUBK_TEST-08976f7d01df473244698700d4cd64e7-X";
 
  amount = 0;

  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}
 
  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}
 
  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

  constructor(private flutterwave: Flutterwave) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5)
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}

