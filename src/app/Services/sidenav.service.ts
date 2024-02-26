import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }
  sideNavClosed : boolean = false;
  user:any
}
