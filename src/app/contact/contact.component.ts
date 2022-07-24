import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from './data.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  postError = false;
  postErrorMessage = '';
  FormData!: FormGroup

  constructor( private builder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),//[Validators.compose([Validators.required, Validators.email])]),
      location: new FormControl('', [Validators.required]),
      orderType: new FormControl('', [Validators.required]),
      theme: new FormControl('', [Validators.required])
    })
  }

  get name() {
    return this.FormData.get('name');
  }

  get email() {
    return this.FormData.get('email');
  }


  onHttpError(errorResponse: any): void {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
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
