import { Component, OnInit } from '@angular/core';
import { SerService } from 'src/app/ser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.component.html',
  styleUrls: ['./homenav.component.css']
})
export class HomenavComponent implements OnInit {

  constructor(public service : SerService,public router : Router) { }

  statustype = '';
  logserver : any;


  ngOnInit() {
    this.checkifLogin();
  }

  gohome() {
    this.router.navigate(["/home"]);
  }
  goabout() {
    this.router.navigate(["/about"]);
  }
  gooption() {
    this.router.navigate(["/Shopping-cart"]);
  }
  gosystem() {
    this.router.navigate(["/system"]);
  }
  gologin() {
    this.router.navigate(["/login"]);
  }
  goClient() {
    this.router.navigate(["/client"]);
  }
  goCompany() {
    this.router.navigate(["/company"]);
  }
  goAdmin() {
    this.router.navigate(["/admin"]);
  }

  gologout() {
    this.service.getlogout().subscribe(
      (date) => console.log("success LogOUt"),
      (error) => console.log(error),
     () => console.log("finish Logout")
    );
    if(sessionStorage.getItem("isLoggedIn")!=null){
      sessionStorage.setItem("isLoggedIn","null");
    }else if(sessionStorage.getItem("sLoggedInCompany")!=null){
      sessionStorage.setItem("isLoggedInCompany","null");
    }else if(sessionStorage.getItem("isLoggedInAdmin")!=null){
      sessionStorage.setItem("isLoggedInAdmin","null");
    }
    this.service.changeType("null");
    this.service.loginback = false;
    this.service.ifinsession = false;
    this.router.navigate(["/home"]);
}

checkifLogin() {
  this.service.getchecklogin().subscribe(
    (data) => this.logserver = data,
    (error) => console.log('not login on cookie'),
    () => this.checklogin())
}

checklogin() {
  if(this.logserver!=null){
    this.service.userdetails = this.logserver;
  //Check Login First 
  if (this.service.userdetails.clienttype == "Customer" && this.logserver.id!=null && this.logserver.comeback ==0) {
    this.service.ifinsession = true;
    this.service.changeType('Client');
    sessionStorage.setItem("isLoggedIn","true");
    let Shoppingcard =  JSON.parse(localStorage.getItem("couponsShopping-Cart"));
    if(Shoppingcard!=null){
      this.router.navigate(["/Shopping-cart"]);
    }
    return
  } else if (this.service.userdetails.clienttype == "Company" && this.logserver.id!=null&& this.logserver.comeback ==0) {
    this.service.ifinsession = true;
    this.service.changeType('Company');
    sessionStorage.setItem("isLoggedInCompany","true");
    return
  } else if (this.service.userdetails.clienttype == "Administrator" && this.logserver.id!=null&& this.logserver.comeback ==0) {
    this.service.ifinsession = true;
    this.service.changeType('Admin');
    sessionStorage.setItem("isLoggedInAdmin","true");
    return;
    //Check if login and the session stil alive
  } else if (this.service.userdetails.clienttype == "Customer" && this.logserver.id!=null && this.logserver.comeback ==1) {
    this.service.loginback = true;
    this.service.ifinsession = false;
    this.service.changeType('Client');
    sessionStorage.setItem("isLoggedIn","true");
    return
  } else if (this.service.userdetails.clienttype == "Company" && this.logserver.id!=null && this.logserver.comeback ==1) {
    this.service.loginback = true;
    this.service.changeType('Company');
    sessionStorage.setItem("isLoggedInCompany","true");
    return
  } else if (this.service.userdetails.clienttype == "Administrator" && this.logserver.id!=null && this.logserver.comeback ==1) {
    this.service.loginback = true;
    this.service.changeType('Admin');
    sessionStorage.setItem("isLoggedInAdmin","true");
    return
  }
    //Check if have this account in DBO
  } else {
    this.service.loginback = false;
    this.service.ifinsession = false;
  }
}
}