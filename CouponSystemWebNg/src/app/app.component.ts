import { Component } from '@angular/core';
import { OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { SerService } from './ser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router,private service : SerService) { }
  
  ngOnInit(): void {
    this.service.getAllCoupon().subscribe(
      (values) => this.service.allcouponforall = (values),
      (error) => console.log('Error opencard json : ' + error),
      () => console.log());
  }

}
