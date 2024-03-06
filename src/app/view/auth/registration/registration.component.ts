import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpSignupService } from 'src/app/Services/http-signup.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
signUpJson:any[]=[];

  registerArr:any[]=[];
  // registerObj:any={
  //   name:'',
  //   mobile:'',
  //   email:'',
  //   password:'',
  //   confirmPass:''
  // };

  faLock = faLock;
  userForm = true;

  register!: FormGroup;
  address!: FormGroup;
  submitted = false;
  addressSubmitted = false;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';


constructor(private formBuilder:FormBuilder, private router: Router,private signUpService:HttpSignupService){}

ngOnInit():void{

  this.register = this.formBuilder.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,99}'
          ),
        ],
      ],
      confirmPass: ['', Validators.required],
    },
    {
      validators: this.MustMatch('password', 'confirmPass'),
    }
  );

}
hideShowPass() {
  this.isText = !this.isText;
  this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
  this.isText ? (this.type = 'text') : (this.type = 'password');
}

MustMatch(password: string, confirmPass: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPass];
    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['MustMatch']
    ) {
      return;
    }
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ MustMatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}

  onSubmit()
  {
    this.submitted = true;
    if (this.register.invalid) {
      return;
    }
    // console.log(this.register.value);

      this.signUpService.addSignup(this.register.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res.Success==true){
          alert('Signup Successful')
          this.register.reset();
          this.router.navigate([''])
        }
      
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }


    })
    // this.registerArr.push(this.registerObj);
    // localStorage.setItem('token',JSON.stringify(this.registerArr));
    // this.registerObj={
    //   name:'',
    //   mobile:'',
    //   email:'',
    //   password:'',
    //   confirmPass:''
    // };
    // this.router.navigate([''])
    
  }
  // toggleForm() {
  //   this.submitted = true;
  //   if (this.register.invalid) {
  //     return;
  //   }
  // }
}
