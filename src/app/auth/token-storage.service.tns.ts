import {Injectable} from '@angular/core';
import {ApplicationSettings} from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {

  }

  saveToken(token) {
    ApplicationSettings.setString('auth-token', token);
  }

  readToken() {
    return ApplicationSettings.getString('auth-token');
  }
}
