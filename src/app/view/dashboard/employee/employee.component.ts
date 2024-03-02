import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpDropdownService } from 'src/app/Services/http-dropdown.service';
import { HttpEmployeeService } from 'src/app/Services/http-employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  selectedCountry: string = '';


  countryArr: any = [];
  stateArrr: any = [];
  cityArr: any = [];

  displayArr: any[] = [];

  employeeForm!: FormGroup;
  submitted: boolean = false;
  selectedState!: string;

  constructor(
    private formbuilder: FormBuilder,
    private employeService: HttpEmployeeService,
    private modelService: NgbModal,
    private httpDropdown: HttpDropdownService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formbuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      empId: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      blood: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      age: ['', Validators.required],
      password: ['', Validators.required],
      CurrentAddress: ['', Validators.required],
      PermanentAddress: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      AddharNumber: ['',],
      file: ['',],
    });

    this.Country();
  }

  Country() {
    this.httpDropdown.getCountry().subscribe({
      next: (resp: any) => {
        
        this.countryArr = resp;
        console.log('Dropdown country', this.countryArr);
      },
    });
  }

  OnSelectCountry(event: any) {
    this.selectedCountry = (this.countryArr.find((c:any)=> c.id == event.target.value)).name
    
    
    // console.log(event.target.value);
    this.httpDropdown.getState().subscribe({
      next: (resp: any) => {
        
        this.stateArrr = resp.filter((e: any) => e.id == event.target.value);        
        this.employeeForm.patchValue({
          city: '',
          state: '',
        });
      },
    });
  }

  OnSelectState(event: any) {
    console.log(this.stateArrr);
    
    this.selectedState = (this.stateArrr.find((c:any)=> c.state_id == event.target.value)).name

    this.httpDropdown.getCity().subscribe({
      next: (resp: any) => {
        this.cityArr = resp.filter((e: any) => e.state_id == event.target.value);
        this.employeeForm.patchValue({
          city: '',
        });
      },
    });
  }

  onSubmit(event:any) {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.employeeForm.patchValue({
      country:this.selectedCountry,
      state: this.selectedState
    });
    console.log(this.employeeForm.value);
    this.employeService.Addemp(this.employeeForm.value).subscribe({
      next: (resp: any) => {
        this.displayArr = resp;
        alert('Employee Added');
        console.log('disssssss',this.displayArr);

        this.employeeForm.reset();
        this.close();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  close() {
    this.modelService.dismissAll();
  }

  copyAddress(event:any){
    if(event.target.checked == true){
      this.employeeForm.patchValue({
        PermanentAddress: this.employeeForm.controls['CurrentAddress'].value
      })
    }
  }
}
