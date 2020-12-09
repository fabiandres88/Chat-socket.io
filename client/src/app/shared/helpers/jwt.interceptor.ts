import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   constructor(private authenticationService: AuthenticationService) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
      const currentUser = this.authenticationService.currentUser;
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(environment.serverUrl);
      if (currentUser && isLoggedIn && isApiUrl) {
         request = request.clone({
            setHeaders: {
               Authorization: `Bearer ${currentUser.token}`
            }
         });
      }

      return next.handle(request);
   }
}