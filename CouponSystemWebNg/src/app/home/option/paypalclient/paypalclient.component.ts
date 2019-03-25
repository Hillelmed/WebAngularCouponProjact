import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { ClientservService } from 'src/app/facade/client/clientserv.service';
import { SerService } from 'src/app/ser.service';
import { coupon } from 'src/app/models/coupon';
import { OptionComponent } from '../option.component';

declare let paypal: any;
@Component({
  selector: 'app-paypalclient',
  templateUrl: './paypalclient.component.html',
  styleUrls: ['./paypalclient.component.css']
})
export class PaypalclientComponent implements AfterViewChecked,OnInit {

  constructor(private service: SerService,private clientservice : ClientservService,private cartshopping : OptionComponent) { }


  errorbuy : any;
  iferror : boolean= false;
  seccessbuy : boolean = false;
  choicecoupon : coupon;

  
 ngOnInit() {
    this.choicecoupon = this.cartshopping.couponsarr[0];
    this.finalcoupon = this.choicecoupon.price;
 }
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalcoupon: number;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AcV4XCPFgykwYT8XIJEOhhNDyqvviekEJUqUuuEz68r2wB5f97XvpXELGYAh-9kPIKAGT9_MwFYETHJF',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalcoupon, currency: 'ILS' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.clientservice.customerbuycoupon(this.choicecoupon.id).subscribe(
        (data) => this.seccessbuy = true,
        (error) => this.checkerror(error),
        () => alert("קנית קופון בהצלחה")
      )
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
  checkerror(error : any){
    this.errorbuy = error;
    if (this.errorbuy != null) {
      this.iferror = true;
      setTimeout(() => {
        this.iferror = false;
      }, 8000);
  }
}

}
