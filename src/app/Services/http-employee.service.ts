import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpEmployeeService {

  constructor(private http:HttpClient) { }

Addemp(data:any)
{
  return this.http.post('http://localhost:3000/employee',data);
}

Getemp(){
  return this.http.get('http://localhost:3000/employee');
}
}
