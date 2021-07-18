import { Component, OnInit } from '@angular/core';
import {AuthService} from '@src/app/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'thesis-client';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

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

  goToQuestion() {
    this.router.navigate(['instance', 2, 'question', 1])
      .catch();
  }

  goToInstances() {
    this.router.navigate(['instance'])
      .catch();
  }
}
