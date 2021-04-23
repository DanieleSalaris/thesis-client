import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  prefix = 'API/auth';
  accessToken = '';

  constructor(private http: HttpClient) { }

  login(userId, password) {
    console.log('login with', userId, password);
    this.http.post(
      `${this.prefix}/login`,
      {userId, password}
    ).pipe(
      tap((res: any) => console.log(res))
    ).subscribe(() => console.log('success'), error => console.log('fail', error));
  }

  get() {
    this.http.get(
      `${this.prefix}/get`
    ).subscribe(() => console.log('success'), error => console.log('fail', error));
  }

  getAccessToken() {
    return this.accessToken;
  }
}
