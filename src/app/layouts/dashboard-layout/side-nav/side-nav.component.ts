import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpSignupService } from 'src/app/Services/http-signup.service';
import { SidenavService } from 'src/app/Services/sidenav.service';
import { LoginComponent } from 'src/app/view/auth/login/login.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {


  constructor(
    private sideNavService: SidenavService,
    private httpSignupService: HttpSignupService, private router:Router
  ) {}
  show: boolean = true;
  toggelNav() {
    this.show = !this.show;
    this.sideNavService.sideNavClosed = this.show;
  }
  user: any;

  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('user')||'');
    // console.log(this.sideNavService.user);
    
    // debugger
    // this.username=this.logincomponent.name;
    // debugger
  }

  logOut(){
    localStorage.removeItem('user')
    this.router.navigate(['../auth/login'])
  }
}
