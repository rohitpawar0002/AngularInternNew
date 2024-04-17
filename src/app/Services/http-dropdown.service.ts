import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpDropdownService {

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
      "preflightContinue": "false"
    })
  }

  getCountry(){
    return this.http.get('http://localhost:8080/api/employee/countryStateCity',this.httpOptions);
  }
  getState(){
    return this.http.get('http://localhost:3000/state');

  }
  getCity(){
    return this.http.get('http://localhost:3000/city');
  }
}
