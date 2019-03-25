import { Component, OnInit } from '@angular/core';
import { SerService } from 'src/app/ser.service';
import { coupon } from 'src/app/models/coupon';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  constructor(private service : SerService,private router: Router,private route: ActivatedRoute) { }

  couponsarr : coupon[];
  TotalPrice : number = 0;
  wrong = false;
  ifhavecoupon : boolean = true;
  canbuypaypal : boolean = false;

  ngOnInit() {
    this.couponsarr =  JSON.parse(localStorage.getItem("couponsShopping-Cart"));
    if(this.couponsarr!=null){
      this.ifhavecoupon = false;
      for (let i = 0; i < this.couponsarr.length; i++) {
        this.TotalPrice = this.TotalPrice+this.couponsarr[i].price;
      }
    }
  }
  buyfromshopping(value : coupon){
    if(this.service.iflogin&&this.service.getsessionClient){
      this.canbuypaypal = true;
      return;
    }
    this.wrong = true;
    setTimeout(() => {
      this.wrong = false;
    }, 3500);
    return;
  }
  ClearCartList(){
    this.service.coupon = new Array;
    this.couponsarr = null;
    this.ifhavecoupon = true;
    localStorage.setItem("couponsShopping-Cart","null");
  }
  RemoveThisCoupon(coupon : coupon){
    for (let i = 0; i < this.couponsarr.length; i++) {
      if(this.couponsarr[i].id == coupon.id){
        this.TotalPrice = this.TotalPrice - this.couponsarr[i].price;
        this.couponsarr.splice(i,1);
      }
    }
    if(this.couponsarr.length==0){
      this.service.coupon = new Array;
      this.couponsarr = null;
      this.ifhavecoupon = true;
    }
    let StringArr = JSON.stringify(this.couponsarr);
    localStorage.setItem("couponsShopping-Cart",StringArr);
  }
  gologin(){
    this.router.navigate(["/login"]);
  }

}
