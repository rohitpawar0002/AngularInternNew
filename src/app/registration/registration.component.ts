import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  faLock = faLock;
  userForm = true;

  loginForm!: FormGroup;
  address!: FormGroup;
  submitted = false;
  addressSubmitted = false;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';


constructor(private formBuilder:FormBuilder, private router: Router){}

ngOnInit():void{

  this.loginForm = this.formBuilder.group(
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

  this.address = this.formBuilder.group({
    line1: ['', Validators.required],
    line2: [''],
    pinCode: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
  });
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
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    
  }
  toggleForm() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userForm = false;
  }
}
