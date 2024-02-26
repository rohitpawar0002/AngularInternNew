import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    HomeComponent,
    DisplayEmployeeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
