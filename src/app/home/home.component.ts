import { Component, OnInit } from '@angular/core';
import {AuthService} from '@src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'thesis-client';

  constructor(private  authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login('001', '12345678');
  }

  get() {
    this.authService.get();
  }
}
