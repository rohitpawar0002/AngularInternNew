import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const token=localStorage.getItem('user')
  if(!token){
    // alert("User not")
    router.navigate(['/auth/login'])
    return false;
  }
  return true;

};

