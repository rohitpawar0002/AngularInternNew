import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HeaderComponent } from './layouts/dashboard-layout/header/header.component';
import { SideNavComponent } from './layouts/dashboard-layout/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    HeaderComponent,
    SideNavComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule ,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
