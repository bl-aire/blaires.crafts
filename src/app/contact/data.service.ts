import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private api = 'https://mailthis.to/blaire'

  constructor(private http: HttpClient) { }

  postContactForm(input: any) : Observable<any> {

    return this.http.post(this.api, input, { responseType: 'text' }).pipe(
      map(
        (response: any) => {
          if (response) {
            return response;
          }
        },
        (error:any) => {
          return error;
        }
      )
    )
  }
}