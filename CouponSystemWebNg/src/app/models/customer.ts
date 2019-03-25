import { coupon } from "./coupon";

export class customer {
    public email : string;
    public password : string;
    public CustName : string;
    public id : number;
    public coupons : coupon[];

    constructor(email : string,password : string , customername : string,id : number,couponsi : coupon[]){
        this.id = id;
        this.CustName = customername;
        this.email = email;
        this.password = password;
        this.coupons = couponsi;
    }
}