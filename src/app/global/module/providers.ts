import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@src/app/auth/auth.interceptor';
import {GlobalInterceptor} from '@src/app/global/global.interceptor';

export const providers = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true,
    }
];
