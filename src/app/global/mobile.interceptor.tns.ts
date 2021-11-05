import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class MobileInterceptorTns implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // substitute server url mobile requests @todo take from env
    //
    const url = req.url.replace('API/',  'https://s265553-thesis-server.herokuapp.com/api/');
    const updatedRequest = req.clone({url});
    return next.handle(updatedRequest);
  }
}
