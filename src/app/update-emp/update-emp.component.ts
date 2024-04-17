import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpDropdownService } from 'src/app/Services/http-dropdown.service';
import { HttpEmployeeService } from 'src/app/Services/http-employee.service';

@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.css'],
})
export class UpdateEmpComponent {
  selectedCountry: string = '';

  countryArr: any = [];
  stateArrr: any = [];
  cityArr: any = [];

  displayArr: any[] = [];

  updateemployeForm!: FormGroup;
  submitted: boolean = false;
  selectedState!: string;
  employee: any;
  isFirstLoad: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private employeService: HttpEmployeeService,
    private modelService: NgbModal,
    private httpDropdown: HttpDropdownService,
    private router: ActivatedRoute,
    private routerNav: Router
  ) {}
  ngOnInit(): void {
    this.isFirstLoad = true;
    this.initForm();
    this.geteditAPI();

    // console.log(this.router.snapshot.params['id']);
  }

  initForm() {
    this.updateemployeForm = this.formbuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      empId: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      blood: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
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
  }

  geteditAPI() {
    this.employeService
      .getemployeById(this.router.snapshot.params['id'])
      .subscribe({
        next: (resp: any) => {
          this.employee = resp.data;
          this.updateemployeForm.patchValue({
            name: this.employee['EmpName'],
            role: this.employee['EmpRole'],
            empId:this.employee['EmpId'],
            gender:this.employee['Gender'],
            date: this.employee['Birth_Date'],
            blood:this.employee['Blood_Group'],
            email: this.employee['Email'],
            mobile:this.employee['Mobile'],
            age: this.employee['Age'],
            password: this.employee['Password'],
            CurrentAddress:this.employee['Current_Address'],
            PermanentAddress: [this.employee['Permanent_Address']],
            AddharNumber: [this.employee['Addhar_Number']],
          });
          this.Country();
        },
      });
  }

  Country() {
    this.httpDropdown.getCountry().subscribe({
      next: (resp: any) => {
        this.countryArr = resp;
        // this.updateemployeForm.patchValue({
        //   country: this.countryArr.find(
        //     (c: any) => c.name == this.employee['country']
        //   ).id,
        // });
        // if (this.isFirstLoad) {
        //   this.getState(this.updateemployeForm.value.country);
        // }
        console.log('Dropdown country', this.countryArr);
      },
    });
  }

  OnSelectCountry(event: any) {
    this.selectedCountry = (this.countryArr.find((c: any) => c.id == event.target.value)).name;
    // this.getState(event.target.value);
    
    // console.log(event.target.value);
    this.httpDropdown.getState().subscribe({
      next: (resp: any) => {
        this.stateArrr = resp.filter((e: any) => e.id == event.target.value);
        // if (this.isFirstLoad) {
        //   this.updateemployeForm.patchValue({
        //     state: this.stateArrr.find((t: any) => t.name == this.employee['state']
        //     ).state_id,
        //   });
          
        //   this.getcity(this.updateemployeForm.value.state)
        // }
        this.updateemployeForm.patchValue({
          city: '',
          state: '',
        });
      },
    });
  }
  
  OnSelectState(event: any) {
    this.selectedState = (this.stateArrr.find((c: any) => c.state_id == event.target.value)).name;

     
    this.httpDropdown.getCity().subscribe({
      next: (resp: any) => {
        this.cityArr = resp.filter((e: any) => e.state_id == event.target.value);
        this.updateemployeForm.patchValue({
          city: '',
        });
        
        // if (this.isFirstLoad) {
        //   this.isFirstLoad = false;
        //   this.updateemployeForm.patchValue({
        //     city: this.stateArrr.find(
        //       (t: any) => t.name == this.employee['city']
        //       ),
        //     });
        //     console.log(this.updateemployeForm.value);
            
        //   }
        },
      });
 }
  Update() {
    this.submitted = true;
    if (this.updateemployeForm.invalid) {
      return;
    }
    this.updateemployeForm.patchValue({
      country: this.selectedCountry,
      state: this.selectedState,
    });
    console.log(this.updateemployeForm.value);
    this.employeService
      .updateEmployeData(
        this.router.snapshot.params['id'],
        this.updateemployeForm.value
      )
      .subscribe({
        next: (resp: any) => {
          this.displayArr = resp;
          alert('Employee Added');
          console.log(this.displayArr);

          this.updateemployeForm.reset();
          this.routerNav.navigate(['dashboard/employee-list']);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  close() {
    this.routerNav.navigate(['dashboard/employee-list'])
  }

  copyAddress(event: any) {
    if (event.target.checked == true) {
      this.updateemployeForm.patchValue({
        PermanentAddress:
          this.updateemployeForm.controls['CurrentAddress'].value,
      });
    }
  }
}
