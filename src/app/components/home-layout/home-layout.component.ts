import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  url_img:string = 'assets/img/avatar1.png'
  // https://source.unsplash.com/c_GmwfHBDzk/200x200
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    
  }

}
