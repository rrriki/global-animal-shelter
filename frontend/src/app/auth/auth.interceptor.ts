import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add Authorization header if token still valid.
        if (this.auth.isAuthenticated()) {
            const clone = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${AuthService.getToken()}`)
            });
            return next.handle(clone).pipe(catchError(this.handleError<any>(clone.url)));
        } else {
            return next.handle(req).pipe(catchError(this.handleError<any>(req.url)));
        }
    }

    /**
     * Logs and redirects the user based on intercepted http errors
     * @param endpoint - URL that resulted in error
     * @param result - optional argument to return as observable
     */
    private handleError<T>(endpoint = 'Operation', result?: T) {
        return async (error: HttpErrorResponse): Promise<T> => {
            const {message, statusCode} = error.error;
            console.log(`ERROR ${statusCode} accessing ${endpoint} - ${message}`);
            switch (statusCode) {
                case 401: {
                    await this.router.navigate(['/users/login']);
                    break;
                }
                case 404: {
                    await this.router.navigate(['/404']);
                    break;
                }
                default: {
                    // TODO: check error.status for routing 500/409
                    this.toastr.error(message, 'Whoops!');
                }
            }

            return of(result as T).toPromise();
        };
    }
}


