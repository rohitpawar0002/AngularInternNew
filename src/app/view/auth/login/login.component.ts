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
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,16}'
          ),
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

    this.signUpService.getSignup().subscribe({
      next: (resp: any) => {
        const user = resp.find((a: any) => {
          return a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
            ? a
            : '';
        });
        if (user) {
          this.sideNavService.user = user
          alert('Login Successful');
          this.loginForm.reset();
          this.router.navigate(['../../dashboard']);
        } else {
          alert('User Not Found');
        }
      },
      error: (err) => {
        alert('Something Was Wrong');
      },
    });
  }
}
