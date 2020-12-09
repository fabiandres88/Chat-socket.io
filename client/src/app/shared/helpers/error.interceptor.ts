import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   constructor(private authenticationService: AuthenticationService) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
         .pipe(catchError(err => {
            const isLoginUrl = request.url.includes("login");

            if (err.status === 401 && !isLoginUrl) {
               this.authenticationService.logout();
               location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
         })
      );
   }
}