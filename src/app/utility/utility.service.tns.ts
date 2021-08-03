import {Injectable} from '@angular/core';
import {isAndroid, isIOS} from '@nativescript/core';
import * as utils from '@nativescript/core/utils/utils';
declare const UIApplication;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() {}

  dismissSoftKeyBoard() {
    // only for mobile
    if (isAndroid) {
      utils.ad.dismissSoftInput();
    }

    if (isIOS) {
      UIApplication.sharedApplication.keyWindow.endEditing(true);
    }
  }
}
