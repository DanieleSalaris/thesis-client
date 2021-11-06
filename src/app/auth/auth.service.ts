import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {TokenStorageService} from '@src/app/auth/token-storage.service';
import isAfter from 'date-fns/isAfter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  prefix = 'api/auth';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
) { }

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

  validToken() {
    const tokenJSON = this.tokenStorageService.readToken();
    if (!tokenJSON) {
      return false;
    }

    const token = this.tokenStorageService.decodeToken(tokenJSON);
    const expireDate = new Date(token.exp * 1000);
    const now = new Date();
    return isAfter(expireDate, now);
  }
}
