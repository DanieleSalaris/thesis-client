import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  get eye() {
    return {
      className: 'far',
      code: this.formatCode(0xf06e)
    };
  }

  get eyeSlash() {
    return {
      className: 'far',
      code: this.formatCode(0xf070)
    };
  }

  constructor() {}

  formatCode(code: number) {
    return String.fromCharCode(code);
  }
}
