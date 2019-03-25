import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { coupon } from 'src/app/models/coupon';
import { userdetails } from 'src/app/models/userdetails';

@Injectable({
  providedIn: 'root'
})
export class SerService {

  constructor(private http: HttpClient) { }
  
  //-------------------------String URL 
    StringURL = "http://ec2-18-224-1-212.us-east-2.compute.amazonaws.com:8080";
  //-----------------------Finish

  LoginType = 'null';
  ifinsession: boolean = false;
  iflogin: boolean = false;
  loginback: boolean = false;
  ifGetoutFromsession: boolean = false;

  getsessionClient: boolean = false;
  getsessionCompany: boolean = false;
  getsessionAdmin: boolean = false;

  allcouponforall : coupon[];
  userdetails: userdetails;
  coupon : coupon[] = new Array;

  public changeType(value: string): void {
    this.LoginType = value;
    this.getSystem(value);
  }
  public getType() {
    return this.LoginType;
  }

  public getAllCoupon(): Observable<coupon[]> {
    return this.http.get<coupon[]>("/CouponREStfull/rest/coupons/readall");
  }

  public getlogin(userdetails: userdetails) {
    let loginurl = this.StringURL + "/CouponREStfull/rest/login";
    return this.http.post(loginurl, userdetails, { responseType: 'json' });
  }

  public getchecklogin() {
    let checklogin = this.StringURL + "/CouponREStfull/rest/login";
    return this.http.get(checklogin, { responseType: 'json' });
  }
  public getlogout() {
    let logouturl =  this.StringURL + "/CouponREStfull/rest/login";
    return this.http.delete(logouturl,{ responseType : 'json'});
  }
  private getSystem(value) {
    if (value == "null") {
      this.getsessionClient = false;
      this.getsessionCompany = false;
      this.getsessionAdmin = false;
      this.iflogin = false;
      this.ifGetoutFromsession = true;
      setTimeout(() => {
        this.ifGetoutFromsession = false;
      }, 80);
      return
    } else if (value == "Company") {
      this.getsessionCompany = true;
      this.iflogin = true;
      return
    } else if (value == "Admin") {
      this.getsessionAdmin = true;
      this.iflogin = true;
      return
    } else if (value == "Client") {
      this.getsessionClient = true;
      this.iflogin = true;
      return
    } else if (value == "endsession") {
      this.getsessionClient = false;
      this.getsessionCompany = false;
      this.getsessionAdmin = false;
      this.iflogin = false;
      this.ifinsession = false;
      this.loginback = false;
      this.ifGetoutFromsession = true;
      alert("נותקת מהמערכת עקב אי שימוש");
      setTimeout(() => {
        this.ifGetoutFromsession = false;
      }, 80);
    }
  }


}
