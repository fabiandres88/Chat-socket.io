import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../app/services/authentication.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user!: User;

  constructor(private router: Router, private authenticationService: AuthenticationService){
    this.authenticationService.user.subscribe(user => this.user = user);
  }  

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
