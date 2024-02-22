import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registerForm!:FormGroup;
  submitted:boolean=false;

constructor(private formbuilder:FormBuilder){}

ngOnInit():void{

  this.registerForm=this.formbuilder.group({
    FirstName:['',Validators.required],
    LastName:['',Validators.required]
  })
}

  onSubmit()
  {
    this.submitted=true;
    if(this.registerForm.invalid){
      return;
    }
    console.log(this.registerForm.value);
    
  }
}
