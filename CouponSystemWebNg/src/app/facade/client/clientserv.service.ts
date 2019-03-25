import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { customer } from 'src/app/models/customer';
import { Observable } from 'rxjs';
import { SerService } from 'src/app/ser.service';

@Injectable({
  providedIn: 'root'
})
export class ClientservService {

  constructor(private http : HttpClient,private serviceurl : SerService) { }

  ifhecanBuy: boolean = false;

  //-------------------------String URL 
  StringURL = this.serviceurl.StringURL;
//-----------------------Finish
  
  public getcustomerdetails(): Observable<customer> {
    return this.http.get<customer>(this.StringURL + "/CouponREStfull/rest/customer/");
  }
  customerbuycoupon(id: number){
    let CustomerPurschaseCouponURL = this.StringURL + '/CouponREStfull/rest/coupons/purchases/'
    return this.http.post(CustomerPurschaseCouponURL+id,{responseType: 'json'});
  }
  customerupdatedeatils(customer:customer){
  let CustomerupdateURL = this.StringURL + '/CouponREStfull/rest/customer/'
  return this.http.put(CustomerupdateURL,customer,{responseType: 'json'});
  }
}

