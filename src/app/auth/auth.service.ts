import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {TokenStorageService} from '@src/app/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  prefix = 'API/auth';
  accessToken = '';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
) { }

  decodeToken(token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
  }

  login(userId, password) {
    return this.http.post(
      `${this.prefix}/login`,
      {userId, password}
    ).pipe(
      tap((res: any) => this.tokenStorageService.saveToken(res.token)),
      // tap((res: any) => console.log(this.decodeToken(res.token)))
    );
  }

  get() {
    this.http.get(
      `${this.prefix}/get`
    ).subscribe(() => console.log('success'), error => console.log('fail', error));
  }

  readToken() {
    return this.tokenStorageService.readToken();
  }
}
