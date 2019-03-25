import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { coupon } from 'src/app/models/coupon';
import { company } from 'src/app/models/company';
import { SerService } from 'src/app/ser.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyservService {

  constructor(private http: HttpClient,private serviceurl : SerService) { }

  //-------------------------String URL 
  StringURL = this.serviceurl.StringURL;
//-----------------------Finish

  public getcompanydetails(): Observable<company> {
    return this.http.get<company>(this.StringURL + "/CouponREStfull/rest/companies/");
  }
  public updateComapny(Company) {
    let updateCompanyUrL = this.StringURL + '/CouponREStfull/rest/companies';
    return this.http.put(updateCompanyUrL, Company, { responseType: 'json' })
  }
  sendCoupon(coupon) {
    let sendcouponURL = this.StringURL + '/CouponREStfull/rest/coupons';
    return this.http.post(sendcouponURL, coupon, { responseType: 'json' });
  }
  updateCoupon(coupon) {
    let updateCouponURL = this.StringURL + '/CouponREStfull/rest/coupons';
    return this.http.put(updateCouponURL, coupon, { responseType: 'json' })
  }
  removeCoupon(id) {
    let RemoveCouponURL = this.StringURL + '/CouponREStfull/rest/coupons/' + id;
    return this.http.delete(RemoveCouponURL,{responseType: 'json',}
    )
  }

}
