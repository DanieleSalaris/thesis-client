import {Injectable} from '@angular/core';
import {ApplicationSettings, isAndroid} from '@nativescript/core';

declare var android;
declare var java;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {}

  saveToken(token) {
    ApplicationSettings.setString('auth-token', token);
  }

  readToken() {
    return ApplicationSettings.getString('auth-token');
  }

  decodeToken(token: string) {
    // Android
    if (isAndroid) {
      // const text = new java.lang.String(token);
      // const data = text.getBytes('UTF-8');
      // const base64 = android.util.Base64.encodeToString(data, android.util.Base64);
      const text = new java.lang.String(token);
      return JSON.parse(android.util.Base64.decode(text, android.util.Base64.DEFAULT));
    }

    // IOS
    // const text = NSString.stringWithString("Yolo 10000");
    // const data = text.dataUsingEncoding(NSUTF8StringEncoding);
    // const base64 = data.base64EncodedStringWithOptions(0);
  }
}
