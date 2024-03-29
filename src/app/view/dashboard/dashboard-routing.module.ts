import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { UpdateEmpComponent } from 'src/app/update-emp/update-emp.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path:'employee-list',
    component:DisplayEmployeeComponent
  },
  {
    path:'add-employee',
    component:EmployeeComponent
  },
  {
    path:'edit/:id',
    component:UpdateEmpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
