import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  saveToken(token) {
    localStorage.setItem('auth-token', token);
  }

  readToken() {
    return localStorage.getItem('auth-token');
  }

  decodeToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
