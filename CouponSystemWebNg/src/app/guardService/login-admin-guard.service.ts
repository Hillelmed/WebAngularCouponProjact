import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuardService implements CanActivate {

  constructor(public router : Router) { }
  public canActivate(): boolean {

    let isLoggedIn = sessionStorage.getItem("isLoggedInAdmin");

    if(isLoggedIn=="true") {
        return true;
    }
    this.router.navigate(["/login"]);
    return false;
}
}
