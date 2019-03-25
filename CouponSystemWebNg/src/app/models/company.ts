import { coupon } from "./coupon";

export class company {
    public email : string;
    public password : string;
    public name : string;
    public id : number;
    public coupons : coupon[];

    constructor(email : string,password : string , companyname : string,id : number,coupons : coupon[]){
        this.coupons = coupons;
        this.id = id;
        this.name = companyname;
        this.email = email;
        this.password = password;
    }
}