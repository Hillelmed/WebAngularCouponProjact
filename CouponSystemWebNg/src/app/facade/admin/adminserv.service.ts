import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { coupon } from 'src/app/models/coupon';
import { customer } from 'src/app/models/customer';
import { company } from 'src/app/models/company';
import { SerService } from 'src/app/ser.service';

@Injectable({
  providedIn: 'root'
})
export class AdminservService {

  constructor(private http: HttpClient,private serviceurl : SerService) { }

  //-------------------------String URL 
  StringURL = this.serviceurl.StringURL;
//-----------------------Finish

  //get All Data about Company,Customer,Coupon From server
  public getAllCoupon(): Observable<coupon[]> {
    return this.http.get<coupon[]>(this.StringURL + "/CouponREStfull/rest/coupons/readall");
  }
  public getAllCustomer(): Observable<customer[]> {
    return this.http.get<customer[]>(this.StringURL + "/CouponREStfull/rest/customer/readall");
  }
  public getAllCompany(): Observable<company[]> {
    return this.http.get<company[]>(this.StringURL + "/CouponREStfull/rest/companies/readall");
  }

  // CUD about Customer
  createNewCustomer(Customer) {
    let CreateCustomerUrL = this.StringURL + "/CouponREStfull/rest/customer";
    return this.http.post(CreateCustomerUrL, Customer, { responseType: 'json' });
  }
  updateCustomer(Customer) {
    let updateCustomerUrL = this.StringURL + '/CouponREStfull/rest/customer';
    return this.http.put(updateCustomerUrL, Customer, { responseType: 'json' })
  }
  deleteCustomer(id) {
    let deleteCustomerURL = this.StringURL + '/CouponREStfull/rest/customer/' + id;
    return this.http.delete(deleteCustomerURL,{responseType: 'json'})
  }

    // CUD about Company
  createNewCompany(Company) {
    let CreateCompanyUrL = this.StringURL + '/CouponREStfull/rest/companies';
    return this.http.post(CreateCompanyUrL, Company, { responseType: 'json' });
  }
  updateComapny(Company) {
    let updateCompanyUrL = this.StringURL + '/CouponREStfull/rest/companies';
    return this.http.put(updateCompanyUrL, Company, { responseType: 'json' })
  }
  deleteCompany(id) {
    let deleteCompanyURL =this.StringURL + '/CouponREStfull/rest/companies/' + id;
    return this.http.delete(deleteCompanyURL,{ responseType: 'json' })
  }
}
