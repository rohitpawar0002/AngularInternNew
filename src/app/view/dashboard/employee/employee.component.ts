import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpDropdownService } from 'src/app/Services/http-dropdown.service';
import { HttpEmployeeService } from 'src/app/Services/http-employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  CurrentTetx: string = '';
  PermanatText: string = '';
 copyEnabled: boolean = false;


countryArr:any=[];
stateArrr:any=[];
cityArr:any=[];

displayArr:any[]=[];

  employeeForm!:FormGroup
  submitted:boolean=false

  constructor(private formbuilder:FormBuilder, private employeService:HttpEmployeeService,
    private router:Router,private modelService:NgbModal,private httpDropdown:HttpDropdownService){}
 
 ngOnInit():void{
this.employeeForm=this.formbuilder.group({
  name:['',Validators.required],
  role:['',Validators.required],
  empId:['',Validators.required],
  gender:['',Validators.required],
  date:['',Validators.required],
  blood:['',Validators.required],
  email:['',[Validators.required,Validators.email]],
  mobile:['',Validators.required],
  age:['',Validators.required],
  password:['',Validators.required],
  CurrentAddress:['',Validators.required],
  PermanentAddress:['',Validators.required],
  country:['',Validators.required],
  state:['',Validators.required],
  city:['',Validators.required],
  AddharNumber:['',Validators.required],
  file:['',Validators.required]
})

this.Country();

 }

 Country(){
  this.httpDropdown.getCountry().subscribe({
    next:((resp:any)=>{
      this.displayArr=resp
      console.log('Dropdown country',this.displayArr);
      
    })
  })
 }

 handleCheckboxChange() {
  if (this.copyEnabled) {
    this.PermanatText = this.CurrentTetx;
  } else {
    this.PermanatText = '';
  }
}
 OnSelectCountry(displayArr:any){
  // console.log(displayArr.target.value);
  this.httpDropdown.getState().subscribe({
    next:((resp:any)=>{
      this.stateArrr=resp.filter((e:any)=>e.id==displayArr.target.value)
      console.log(this.stateArrr,'....');
    })
  }); 
 }

 OnSelectState(stateArrr:any){
  this.httpDropdown.getCity().subscribe({
    next:((resp:any)=>{
      this.cityArr=resp.filter((e:any)=>e.state_id==stateArrr.target.value)
      console.log('City Array',this.cityArr);
      
    })
  })  
 }

  onSubmit()
  {
    this.submitted=true
    if(this.employeeForm.invalid)
    {
      return
      
    }
  
    console.log(this.employeeForm.value);
    this.employeService.Addemp(this.employeeForm.value).subscribe({
      next:(resp:any)=>{
        this.displayArr=resp
        alert("Employee Added")       
        console.log(this.displayArr);
        
        this.employeeForm.reset();
        // this.modelService.dismissAll()
        // this.router.navigate(['display'])
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

  }
  close(){
    this.modelService.dismissAll()

  }


  
}
