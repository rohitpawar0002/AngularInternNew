import { Component } from '@angular/core';
import { HttpSignupService } from 'src/app/Services/http-signup.service';
import { SidenavService } from 'src/app/Services/sidenav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  userName: any;

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
  }
}
