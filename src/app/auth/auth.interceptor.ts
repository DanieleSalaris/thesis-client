import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '@src/app/auth/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenStorageService: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // getting access token
        const accessToken = this.tokenStorageService.readToken();

        // adding authorization header
        const requestWithAccessToken = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });

        return next.handle(requestWithAccessToken);
    }
}
