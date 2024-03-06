import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpEmployeeService } from 'src/app/Services/http-employee.service';
import { EmployeeComponent } from '../employee/employee.component';
import { UpdateEmpComponent } from 'src/app/update-emp/update-emp.component';
@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css'],
})
export class DisplayEmployeeComponent {
  displayTableArray: any[] = [];

  constructor(
    private employeeService: HttpEmployeeService,
    private modelService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }
  onEdit(i:any){
    this.displayTableArray=i;

   }

  getEmployee() {
    this.employeeService.Getemp('employee').subscribe((resp: any) => {
      this.displayTableArray = resp.userList;
      console.log('Display component', this.displayTableArray);
      // alert('Display Successfully!')
    });
  }
  addEmployee() {
    const ref = this.modelService.open(EmployeeComponent, {
      fullscreen: 'xxl',
    });
    ref.dismissed.subscribe({
      next: () => {
        this.getEmployee();
      },
    });
  }

  Ondelete(event:any,id:any){
    if(confirm('Are you sure you want to delete this data?'))
    {
      event.target.innerText="Deleting...";
      this.employeeService.deleteEmployeData(id).subscribe({
        next:((resp:any)=>{
          this.getEmployee();
        })
      })
    }
  } 
}
