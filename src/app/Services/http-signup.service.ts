import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpSignupService {

  constructor( private http:HttpClient) { }


  addSignup(data:any){
    return this.http.post('http://localhost:3000/signupUsers',data);
  }
  getSignup(){
    return this.http.get('http://localhost:3000/signupUsers');
  }

}
