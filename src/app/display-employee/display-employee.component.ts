import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpEmployeeService } from 'src/app/Services/http-employee.service';
import { EmployeeComponent } from '../view/dashboard/employee/employee.component';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent {

  displayTableArray:any[]=[];
 
  ngOnInit():void{
    this.getEmployee();
}
  constructor(private employeeService:HttpEmployeeService,private modelService:NgbModal ){}

  

  getEmployee(){
    this.employeeService.Getemp().subscribe((resp:any)=>{
      this.displayTableArray=resp
      console.log('Display component',this.displayTableArray);
      // alert('Display Successfully!')
      
    })
  }
  addEmployee(){
    this.modelService.open(EmployeeComponent,{
      fullscreen:'xxl'
    })
  }
}
