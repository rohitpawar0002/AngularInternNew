import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpDropdownService {

  constructor(private http:HttpClient) { }


  getCountry(){
    return this.http.get('http://localhost:3000/country');
  }
  getState(){
    return this.http.get('http://localhost:3000/state');

  }
  getCity(){
    return this.http.get('http://localhost:3000/city');
  }
}
