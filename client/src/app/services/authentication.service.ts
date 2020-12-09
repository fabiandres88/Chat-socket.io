import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) { 
    const user_session = localStorage.getItem('user_session');
    const user = user_session ? JSON.parse(user_session) : new User();

    this._user = new BehaviorSubject<User>(user);
    this.user = this._user.asObservable();
  }

  public get currentUser(): User {
    return this._user.value;
  }

  login(username: string, password: string) {
    const url = `/api/users/login`;

    return this.http.post<any>(url, { username, password })
        .pipe(map(user => {            
          this._user.next(user);
          this.setLocalStorage(user);          
          return user;
        }));
  }

  setLocalStorage(user: User) {    
    localStorage.setItem('user_session', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user_session');    
    this._user.next(new User());
  }
}
