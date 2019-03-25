import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginCompanyGuardService implements CanActivate {

  constructor(public router : Router) { }
  public canActivate(): boolean {

    let isLoggedIn = sessionStorage.getItem("isLoggedInCompany");

    if(isLoggedIn=="true") {
        return true;
    }
    this.router.navigate(["/login"]);
    return false;
}
}
