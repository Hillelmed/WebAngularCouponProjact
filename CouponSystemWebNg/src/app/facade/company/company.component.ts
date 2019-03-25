import { Component, OnInit } from '@angular/core';
import { CompanyservService } from './companyserv.service'
import { SerService } from 'src/app/ser.service';
import { coupon } from 'src/app/models/coupon';
import { company } from 'src/app/models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private service: CompanyservService,public serservice: SerService) { }

  delete: boolean = true;
  update: boolean = false;
  add: boolean = false;
  updatecompany:boolean = false;

  CouponsCompany :coupon[]= [];
  havedetails: boolean = false;
  haveCoupon: boolean = false;
  iferror : boolean = false;
  erroraction: any;
  answerfromServer:any;
  details :company;

  coupon : coupon = {
    id : null,
    title: null,
    description: null,
    category: null,
    startDates: null,
    endDates: null,
    amount: null,
    price: null,
    image: null,
    compID: null
  };

  //This company
  company : company = {
    id: null,
    name: null,
    email: null,
    password: null,
    coupons : null
  };

  ngOnInit() {
    this.getdetailsaboutComapny();
  }

  getdetailsaboutComapny() {
    this.details = null;
    this.havedetails = false;
    this.service.getcompanydetails().subscribe(
      (data) => this.details = (data),
      (error) => this.serservice.changeType("endsession"),
      () => this.orgenizedetails())
  }

  orgenizedetails() {
    if(this.details!=null){
      this.havedetails = true;
      if(this.details.coupons!=null){
        this.haveCoupon = true;
      }
    }
  }
  onSendCoupon() {
    this.coupon.compID = this.details.id;
    this.service.sendCoupon(this.coupon).subscribe(
      (date) => this.answerfromServer = date,
      (error) => this.checkerror(error),
      () => this.getdetailsaboutComapny())
  }
  updatecoupon() {
    this.coupon.compID = this.details.id;
    this.service.updateCoupon(this.coupon).subscribe(
      (date) => this.answerfromServer = date,
      (error) => this.checkerror(error),
      () => this.getdetailsaboutComapny())
  }
  removeCoupon(id : number){
    if(id==null){
      alert("need to put number");
      return ;
    }
    this.service.removeCoupon(id).subscribe(
      (date) => this.answerfromServer = date,
      (error) => this.checkerror(error),
      () => this.getdetailsaboutComapny()
    )
  }
  onUpdateCompany() {
    this.company.id = this.details.id;
    this.company.name = this.details.name;
    this.answerfromServer = null;
    this.service.updateComapny(this.company).subscribe(
      (value) => this.answerfromServer = (value),
      (error) => this.checkerror(error),
      () => console.log("Update Success new deatils"))
  }

  getSelect(value: string) {
    switch (value) {
      case "add":
        this.add = true;
        this.update = false;
        this.delete = false;
        this.updatecompany = false;
        this.coupon = {
          id : null,
          title: null,
          description: null,
          category: null,
          startDates: null,
          endDates: null,
          amount: null,
          price: null,
          image: null,
          compID: null
        };
        break;
      case "update":
        this.add = false;
        this.update = true;
        this.delete = false;
        this.updatecompany = false;
        this.coupon = {
          id : null,
          title: null,
          description: null,
          category: null,
          startDates: null,
          endDates: null,
          amount: null,
          price: null,
          image: null,
          compID: null
        };
        break;
      case "delete":
        this.add = false;
        this.update = false;
        this.delete = true;
        this.updatecompany = false;
        break;
      case "updatecompany":
        this.updatecompany = true;
        this.add = false;
        this.update = false;
        this.delete = false;
        this.company = {
          id: null,
          name: null,
          email: null,
          password: null,
          coupons : null
        };
        break;
      default:
        break;
    }
  }
  checkerror(error : any){
    this.erroraction = error;
    console.log(error);
    if (this.erroraction != null) {
      this.iferror = true;
      setTimeout(() => {
        this.iferror = false;
      }, 8000);
  }
}
}
