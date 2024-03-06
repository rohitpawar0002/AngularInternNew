import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpSignupService {

  constructor( private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
      "preflightContinue": "false"
    })
  }
  
  addSignup(data:any){
        return this.http.post('http://localhost:8080/api/auth/register',data,this.httpOptions);
  }
  getSignup(data:any){
    return this.http.get('http://localhost:8080/api/auth/login?username=' +data.email  +"&password=" + data.password,this.httpOptions );
  }

}
