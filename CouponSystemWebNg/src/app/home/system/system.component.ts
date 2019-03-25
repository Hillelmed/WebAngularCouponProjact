import { Component, OnInit } from '@angular/core';
import { SerService } from 'src/app/ser.service';
import { userdetails } from 'src/app/models/userdetails';
import { Router, ActivatedRoute } from '@angular/router';
import { customer } from 'src/app/models/customer';
import { ClientservService } from 'src/app/facade/client/clientserv.service';
import { coupon } from 'src/app/models/coupon';
import { HomeComponent } from '../home.component';
import { stringify } from 'querystring';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  constructor(private route: ActivatedRoute,public service : SerService,private router : Router) { }

  allCoupon : coupon[];
  choicecoupon : coupon;
  ngOnInit() {
    this.allCoupon = this.service.allcouponforall;
    this.route.params.subscribe(params => {
     for (let i = 0; i < this.allCoupon.length; i++) {
       if(this.allCoupon[i].id==params['id']){
        this.choicecoupon = this.allCoupon[i];
       }
     }
    });
  }
  addCouponToCart(value: coupon) {
    for (let i = 0; i < this.service.coupon.length; i++) {
      if(this.service.coupon[i].id==value.id){
         alert("קופון זה כבר נמצא בסל הקניות");
         return;
      }
    }
    this.service.coupon.push(value);
    this.router.navigate(["/Shopping-cart"]);
    let StringArr = JSON.stringify(this.service.coupon);
    localStorage.setItem("couponsShopping-Cart",StringArr);
  }
  Goback(){
    this.router.navigate(["/home"]);
}
}
