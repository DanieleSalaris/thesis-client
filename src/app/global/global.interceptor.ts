import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;

        // if request has a body (POST, PUT, PATCH) add
        switch (req.method) {
            case 'POST':
            case 'PUT':
            case 'PATCH':
                request = req.clone({
                    headers: request.headers.set('Content-Type', 'application/json')
                });
        }
        return next.handle(request);
    }
}
