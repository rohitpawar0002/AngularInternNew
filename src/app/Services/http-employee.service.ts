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
getemployeById(id:any){
  return this.http.get(`http://localhost:3000/employee/${id}`)
}
updateEmployeData(id:any,data:any){
  return this.http.put(`http://localhost:3000/employee/${id}`,data)
}
deleteEmployeData(id:any){
  return this.http.delete(`http://localhost:3000/employee/${id}`)
}
}
