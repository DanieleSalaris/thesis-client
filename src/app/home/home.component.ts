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
    this.authService.login('002', '12345678')
      .subscribe(
        () => {},
        error => console.error(error)
      );

    // this.authService.tryToken();
  }

  readToken() {
    const token = this.authService.readToken();
    console.log(token);
  }

  get() {
    this.authService.get();
  }
}
