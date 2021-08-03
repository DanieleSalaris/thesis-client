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
    const tokenBody = token.split('.')[1];

    // Android
    if (isAndroid) {
      const data = android.util.Base64.decode(tokenBody, android.util.Base64.DEFAULT);
      const decodedString = new java.lang.String(data, java.nio.charset.StandardCharsets.UTF_8);
      return JSON.parse(decodedString);
    }

    // IOS
    // @todo implements for ios
    // const text = NSString.stringWithString("Yolo 10000");
    // const data = text.dataUsingEncoding(NSUTF8StringEncoding);
    // const base64 = data.base64EncodedStringWithOptions(0);
  }
}
