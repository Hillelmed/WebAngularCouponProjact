import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SerService } from '../ser.service';
import { Router } from '@angular/router';
import { userdetails } from '../models/userdetails';
import { coupon } from '../models/coupon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  constructor(public service: SerService, private router: Router) { }

  public couponarr: coupon[];
  public choicecouponType : coupon[];
  public ifChoiceCoupon : boolean = false;
  public ViewAllCoupon : boolean = false;
  private config = [];

  ngOnInit() {
    if (this.couponarr == null) {
      this.getCoupon();
    }
  }
  ChoiceByTypeCoupon(type : string){
    this.choicecouponType = new Array;
    if (this.couponarr != null) {
        for (let i = 0; i < this.couponarr.length; i++) {
          if(this.couponarr[i].category== type){
            this.choicecouponType.push(this.couponarr[i]);
          }
        }
        this.ViewAllCoupon = false;
        this.ifChoiceCoupon = true;
    }
  }
  getCouponBooleanView(){
    this.service.allcouponforall = this.couponarr;
    this.ifChoiceCoupon = false;
    this.ViewAllCoupon = true;
  }
  getCoupon() {
    this.service.getAllCoupon().subscribe(
      (values) => this.couponarr = (values),
      (error) => console.log('Error opencard json : ' + error),
      () => this.getCouponBooleanView());
  }
  buycoupon(value: coupon) {
    this.router.navigate(["/system/" + value.id]);
  }

}
