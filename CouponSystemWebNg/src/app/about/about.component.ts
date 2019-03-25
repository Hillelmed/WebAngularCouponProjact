import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  linklinkedin = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1024px-Linkedin.svg.png"
  linkfacebook = "https://s18955.pcdn.co/wp-content/uploads/2017/05/Facebook.png"
  linkphoto = "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/14642488_676559235838036_5513857780296825945_n.jpg?_nc_cat=105&_nc_ht=scontent.fsdv2-1.fna&oh=f0c9271026f13ecdeadeeefbbbb2696a&oe=5C6A2922";

}
