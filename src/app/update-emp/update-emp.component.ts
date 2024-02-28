import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpDropdownService } from 'src/app/Services/http-dropdown.service';
import { HttpEmployeeService } from 'src/app/Services/http-employee.service';

@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.css']
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

  
  constructor(
    private formbuilder: FormBuilder,
    private employeService: HttpEmployeeService,
    private modelService: NgbModal,
    private httpDropdown: HttpDropdownService,
    private router:ActivatedRoute,
    private routerNav:Router
  ) {}
  ngOnInit(): void {
    this.updateemployeForm = this.formbuilder.group({
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
      AddharNumber: ['', Validators.required],
      file: ['', Validators.required],
    });

    // console.log(this.router.snapshot.params['id']);
    this.Country();
this. geteditAPI()

    
  }

  geteditAPI(){
    this.employeService.getemployeById(this.router.snapshot.params['id']).subscribe({
      next:((resp:any)=>{
        this.updateemployeForm = this.formbuilder.group({
          name: [resp['name']],
          role: [resp['role']],
          empId: [resp['empId']],
          gender: [resp['gender']],
          date: [resp['date']],
          blood: [resp['blood']],
          email: [resp['email']],
          mobile: [resp['mobile']],
          age: [resp['age']],
          password: [resp['password']],
          CurrentAddress: [resp['CurrentAddress']],
          PermanentAddress: [resp['PermanentAddress']],
          country: [resp['country']],
          state: [resp['state']],
          city: [resp['city']],
          AddharNumber:[resp['AddharNumber']],
          file: [resp['file'] ],
        });
            
      })
    })
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
    this.selectedCountry = (this.countryArr.find((c:any)=> c.id == event.target.value))
    
    // console.log(event.target.value);
    this.httpDropdown.getState().subscribe({
      next: (resp: any) => {
        
        this.stateArrr = resp.filter(
          
          (e: any) => e.id == event.target.value
          
        );
        
        this.updateemployeForm.patchValue({
          city: '',
          state: '',
        });
      },
    });
  }

  OnSelectState(event: any) {
    this.selectedState = (this.stateArrr.find((c:any)=> c.id == event.target.value))

    this.httpDropdown.getCity().subscribe({
      next: (resp: any) => {
        this.cityArr = resp.filter(
          (e: any) => e.state_id == event.target.value
        );
        this.updateemployeForm.patchValue({
          city: '',
        });
      },
    });
  }

  Update() {
    this.submitted = true;
    if (this.updateemployeForm.invalid) {
      return;
    }
    this.updateemployeForm.patchValue({
      country:this.selectedCountry,
      state: this.selectedState
    });
    console.log(this.updateemployeForm.value);
    this.employeService.updateEmployeData(this.router.snapshot.params['id'],this.updateemployeForm.value).subscribe({
      next: (resp: any) => {     
        this.displayArr = resp;
        alert('Employee Added');
        console.log(this.displayArr);

        this.updateemployeForm.reset();
        this.routerNav.navigate(['dashboard/employee-list'])
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
      this.updateemployeForm.patchValue({
        PermanentAddress: this.updateemployeForm.controls['CurrentAddress'].value
      })
    }
  }

}
