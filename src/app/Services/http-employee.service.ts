import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpEmployeeService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
      "preflightContinue": "false"
    })
  }
  baseURL = 'http://localhost:8080/api/';

  Addemp(data: any,) {
    debugger
        return this.http.post('http://localhost:8080/api/employee/addemployee', data,this.httpOptions);
  }

  Getemp(api:string,) {
    return this.http.get(this.baseURL+api);
  }
  getemployeById(id: any) {
    return this.http.get(`http://localhost:3000/employee/${id}`);
  }
  updateEmployeData(id: any, data: any) {
    return this.http.put(`http://localhost:3000/employee/${id}`, data);
  }
  deleteEmployeData(id: any) {
    return this.http.delete(`http://localhost:8080/api/employee/delete/${id}`,this.httpOptions);
  }
}
