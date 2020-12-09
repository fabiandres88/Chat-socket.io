import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {  
  public login = {
    username: '',
    password: ''
  };

  loading = false;  
  returnUrl!: string;
  error = '';

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    if (this.authenticationService.currentUser) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loading = true;
    this.authenticationService.login(this.login.username, this.login.password)
        .pipe(first())
        .subscribe(
            data => {              
              this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }
}
