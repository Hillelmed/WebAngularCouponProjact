import { Component, OnInit } from '@angular/core';
import { ClientservService } from './clientserv.service';
import { iif } from 'rxjs';
import { SerService } from 'src/app/ser.service';
import { error } from '@angular/compiler/src/util';
import { customer } from 'src/app/models/customer';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private service: ClientservService, public serservice: SerService) { }

  pageready: boolean = false;
  couponready: boolean = false;
  buyCouponsuccess: boolean = true;
  iferror: boolean = false;
  ifsuccess: boolean = false;
  details: customer;
  seccessbuy: any;
  errorbuy: any;

  ngOnInit() {
    this.getdetailsaboutCustomer();
  }

  getdetailsaboutCustomer() {
    this.service.getcustomerdetails().subscribe(
      (data) => this.details = (data),
      (error) => this.serservice.changeType("endsession"),
      () => this.orgenizedetails())
  }
  buyCoupon(id : any) {
    this.service.customerbuycoupon(id).subscribe(
      (data) => this.seccessbuy = (data),
      (error) => this.checkerror(error),
      () => this.getdetailsaboutCustomer()
    )
  }

  orgenizedetails() {
    if (this.details.coupons != null) {
      this.couponready = true;
      this.pageready = true;
      }
  }
  checkerror(error : any){
    this.errorbuy = error;
    console.log(error);
    if (this.errorbuy != null) {
      this.iferror = true;
      setTimeout(() => {
        this.iferror = false;
      }, 8000);
  }
}
  getcustname(): string {
    if (this.details.CustName != null) {
      return this.details.CustName;
    } else {
      return null;
    }
    return null
  }

}
