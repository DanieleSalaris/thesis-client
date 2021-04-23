import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@src/app/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // getting access token
        const accessToken = this.authService.getAccessToken();

        // adding authorization header
        const requestWithAccessToken = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });

        return next.handle(requestWithAccessToken);
    }
}
