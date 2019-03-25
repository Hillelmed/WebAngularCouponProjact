import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SerService } from '../ser.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { userdetails } from 'src/app/models/userdetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public ser: SerService, private router: Router) { }

  ngOnInit() {
    this.checkifLogin();
  }

  saveUsername : boolean;
  Blockbyserver: boolean = false;
  public wrongconnect: boolean = false;
  public logserver :any ;
  userdetails :userdetails = {"email": null,"password": null,"clienttype": null,"id" : null,"comeback": null};

  timeLeft: number = 30;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 30;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  checkifLogin() {
    this.ser.getchecklogin().subscribe(
      (data) => this.logserver = data,
      (error) => console.log('not login on cookie'),
      () => this.checklogin())
  }
  onSubmit() {
    this.logserver = null;
    this.ser.getlogin(this.userdetails).subscribe(
      (data) => this.logserver = data,
      (error) => this.checklogin(),
      () => this.checklogin())
  }
  checklogin() {
    if(this.logserver!=null){
      this.ser.userdetails = this.logserver;
    //Check Login First 
    if (this.ser.userdetails.clienttype == "Customer" && this.logserver.id!=null && this.logserver.comeback ==0) {
      this.ser.ifinsession = true;
      this.ser.changeType('Client');
      sessionStorage.setItem("isLoggedIn","true");
      let Shoppingcard =  JSON.parse(localStorage.getItem("couponsShopping-Cart"));
      if(Shoppingcard!=null){
        this.router.navigate(["/Shopping-cart"]);
      }
      return
    } else if (this.ser.userdetails.clienttype == "Company" && this.logserver.id!=null&& this.logserver.comeback ==0) {
      this.ser.ifinsession = true;
      this.ser.changeType('Company');
      sessionStorage.setItem("isLoggedInCompany","true");
      return
    } else if (this.ser.userdetails.clienttype == "Administrator" && this.logserver.id!=null&& this.logserver.comeback ==0) {
      this.ser.ifinsession = true;
      this.ser.changeType('Admin');
      sessionStorage.setItem("isLoggedInAdmin","true");
      return;
      //Check if login and the session stil alive
    } else if (this.ser.userdetails.clienttype == "Customer" && this.logserver.id!=null && this.logserver.comeback ==1) {
      this.ser.loginback = true;
      this.ser.ifinsession = false;
      this.ser.changeType('Client');
      sessionStorage.setItem("isLoggedIn","true");
      return
    } else if (this.ser.userdetails.clienttype == "Company" && this.logserver.id!=null && this.logserver.comeback ==1) {
      this.ser.loginback = true;
      this.ser.changeType('Company');
      sessionStorage.setItem("isLoggedInCompany","true");
      return
    } else if (this.ser.userdetails.clienttype == "Administrator" && this.logserver.id!=null && this.logserver.comeback ==1) {
      this.ser.loginback = true;
      this.ser.changeType('Admin');
      sessionStorage.setItem("isLoggedInAdmin","true");
      return
    }
      //Check if have this account in DBO
    } else if (this.logserver == null) {
      this.wrongconnect = true;
      setTimeout(() => {
        this.wrongconnect = false;
      }, 3500);
      return
    } else if(this.logserver.comeback == -1){
      this.UserBlock();
    } else {
      this.ser.loginback = false;
      this.ser.ifinsession = false;
    }
  }
  public logout() {
    this.ser.getlogout().subscribe(
      (date) => console.log('Logout Success'),
      (error) => this.logoutView(),
      () => this.logoutView(),
    )
  }

  logoutView() {
    if(sessionStorage.getItem("isLoggedIn")!=null){
      sessionStorage.setItem("isLoggedIn","null");
    }else if(sessionStorage.getItem("sLoggedInCompany")!=null){
      sessionStorage.setItem("isLoggedInCompany","null");
    }else if(sessionStorage.getItem("isLoggedInAdmin")!=null){
      sessionStorage.setItem("isLoggedInAdmin","null");
    }
    this.ser.changeType("null");
    this.logserver = "null";
    this.ser.loginback = false;
    this.ser.ifinsession = false;
    this.wrongconnect = false;
    this.router.navigate(["/home"]);
  }
  UserBlock(){
    this.startTimer();
    this.Blockbyserver = true;
    this.ser.loginback = false;
    this.ser.ifinsession = false;
    this.ser.iflogin = true;
    setTimeout(() => {
      this.Blockbyserver = false;
      this.ser.iflogin = false;
    }, 30000);
  }
}


