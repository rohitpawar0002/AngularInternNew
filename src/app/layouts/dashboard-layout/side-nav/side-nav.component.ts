import { Component,  } from '@angular/core';
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
    private httpSignupService: HttpSignupService
  ) {}
  show: boolean = true;
  toggelNav() {
    this.show = !this.show;
    this.sideNavService.sideNavClosed = this.show;
  }
  user: any;

  ngOnInit(): void {
    
    this.user = this.sideNavService.user;
    // debugger
    // this.username=this.logincomponent.name;
    // debugger
  }
}
