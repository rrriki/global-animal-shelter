import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const tokenId = localStorage.getItem('token_id');

        if (tokenId) {
            const clone = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${ tokenId }`)
            });

            return next.handle(clone);
        } else {
            next.handle(req);
        }
    }

}
