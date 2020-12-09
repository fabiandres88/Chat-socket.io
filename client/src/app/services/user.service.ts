import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "/api/users";
  constructor(private http: HttpClient) { }

  create(user: any) {
    return this.http.post<any>(this.url, user)
        .pipe(map(user => {
          return user;
        }));
  }
}
