import { Component } from '@angular/core';
import { SidenavService } from 'src/app/Services/sidenav.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
constructor(public sideNavService:SidenavService){}

}
