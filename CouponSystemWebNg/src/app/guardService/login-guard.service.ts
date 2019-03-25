import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(public router : Router) { }

  public canActivate(): boolean {

    let isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if(isLoggedIn=="true") {
        return true;
    }
    this.router.navigate(["/login"]);
    return false;
}
}
