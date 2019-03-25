import { Component, OnInit } from '@angular/core';
import { AdminservService } from './adminserv.service';
import { customer } from 'src/app/models/customer';
import { company } from 'src/app/models/company';
import { coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: AdminservService) { }

  errorFromServer : any;
  iferror : boolean = false;
  answerfromServer : any;
  //Array Data from Server
  allCustomer : customer[]= [];
  allCompany : company[] = [];
  allCoupon : coupon[]= [];
  //Company and Customer JSON : 
  customer : customer = {"email": null,"CustName" : null , "id" : null,"password" : null,"coupons" : null};
  company :company = {"email": null,"name" : null , "id" : null,"password" : null,"coupons" : null};
  //option for Look Data for admin 
  ifonallcustomer = true;
  ifonallcomapanies = false;
  ifonallcoupons = false;
  // option action for Admin
  addcustomer = true;
  updatecustomer = false;
  removecustomer = false;
  addcompany = false;
  updatecompany = false;
  removecompany = false;

  ngOnInit() {
    this.getallCustomertoadmin();
  }

  getallCustomertoadmin() {
    this.service.getAllCustomer().subscribe(
      (data) => this.allCustomer= (data),
      (error) => this.checkerror(error),
      () => this.getallComapnytoadmin()
    )
  }
  getallComapnytoadmin() {
    this.service.getAllCompany().subscribe(
      (data) => this.allCompany = (data),
      (error) => this.checkerror(error),
      () => this.getallCoupontoadmin()
    )
  }
  getallCoupontoadmin() {
    this.allCoupon = [];
    this.service.getAllCoupon().subscribe(
      (data) => this.allCoupon = (data),
      (error) => this.checkerror(error),
      () => console.log("success HttpReq from admin"))
  }
  // Switch for action admin wand to do
  getSelect(value: string) {
    switch (value) {
      case "addcustomer":
        this.addcustomer = true;
        this.updatecustomer = false;
        this.removecustomer = false;
        this.addcompany = false;
        this.updatecompany = false;
        this.removecompany = false;
        break;
      case "updatecustomer":
        this.updatecustomer = true;
        this.addcustomer = false;
        this.removecustomer = false;
        this.addcompany = false;
        this.updatecompany = false;
        this.removecompany = false;
        break;
      case "removecustomer":
        this.removecustomer = true;
        this.addcustomer = false;
        this.updatecustomer = false;
        this.addcompany = false;
        this.updatecompany = false;
        this.removecompany = false;
        break;
      case "addcompany":
        this.addcompany = true;
        this.addcustomer = false;
        this.updatecustomer = false;
        this.removecustomer = false;
        this.updatecompany = false;
        this.removecompany = false;
        break;
      case "updatecompany":
        this.updatecompany = true;
        this.addcompany = false;
        this.addcustomer = false;
        this.updatecustomer = false;
        this.removecustomer = false;
        this.removecompany = false;
        break;
      case "removecompany":
        this.removecompany = true;
        this.updatecompany = false;
        this.addcompany = false;
        this.addcustomer = false;
        this.updatecustomer = false;
        this.removecustomer = false;
        break;
      default:
        break;
    }
  }
  //Switch for Data want admin to see
  getSelectDate(value: string) {
    switch (value) {
      case "allcustomer":
        this.ifonallcustomer = true;
        this.ifonallcomapanies = false;
        this.ifonallcoupons = false;
        break;
      case "allcomapanies":
        this.ifonallcustomer = false;
        this.ifonallcomapanies = true;
        this.ifonallcoupons = false;
        break;
      case "allcoupons":
        this.ifonallcustomer = false;
        this.ifonallcomapanies = false;
        this.ifonallcoupons = true;
        break;
      default:
        break;
    }
  }
  //This method CUD a  Customer
  onAddCustomer() {
    this.answerfromServer = null;
    this.service.createNewCustomer(this.customer).subscribe(
      (value) => this.answerfromServer = (value),
      (error) => this.checkerror(error),
      () => console.log("success create new Customer")
    )
  }
  onUpdateCustomer() {
    this.answerfromServer = null;
    this.service.updateCustomer(this.customer).subscribe(
      (value) => this.answerfromServer = (value),
      (error) => this.checkerror(error),
      () => console.log("Update Success new Customer")
    )
  }
  onRemoveCustomer() {
    this.answerfromServer = null;
    this.service.deleteCustomer(this.customer.id).subscribe(
      (value) => this.answerfromServer = (value),
      (error) => this.checkerror(error),
      () => console.log("delet Customer Success")
    )
  }
  //This method CUD a  Comapny
  onAddCompany() {
    this.answerfromServer = null;
    this.service.createNewCompany(this.company).subscribe(
      (value) => this.answerfromServer = (value),
      (error) => this.checkerror(error),
      () => console.log("success create new Comapny")
    )
  }
  onUpdateCompany() {
    this.answerfromServer = null;
    this.service.updateComapny(this.company).subscribe(
      (value) => this.answerfromServer = (value),
      (error) => this.checkerror(error),
      () => console.log("Update Success new Comapny")
    )
  }
  onRemoveComapny() {
    this.answerfromServer = null;
    this.service.deleteCompany(this.company.id).subscribe(
      (value) => this.answerfromServer = (value),
      (error) => this.checkerror(error),
      () => console.log("delet Company Success")
    )
  }
  checkerror(error : any){
    this.errorFromServer = error;
    console.log(error);
    if (this.errorFromServer != null) {
      this.iferror = true;
      setTimeout(() => {
        this.iferror = false;
      }, 8000);
  }
}
}
