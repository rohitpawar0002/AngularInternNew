import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpSignupService } from 'src/app/Services/http-signup.service';
import { SidenavService } from 'src/app/Services/sidenav.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  faLock = faLock;

  username: any[] = [];
name: any 
  loginForm!: FormGroup;
  submitted = false;

  userForm: boolean = true;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signUpService: HttpSignupService,
    private sideNavService:SidenavService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,99}'
          // ),
        ],
      ],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.signUpService.getSignup(this.loginForm.value).subscribe((res:any)=>{
      if (res.Success==true) {
        this.sideNavService.user = res
        localStorage.setItem('user',JSON.stringify(res))
        alert("Login Successful!")
        this.loginForm.reset();
        this.router.navigate(['../../dashboard']);
      } else if(res.Success==false){
        alert('User Not Found');
      }
    })
  
     
    
  }
}

