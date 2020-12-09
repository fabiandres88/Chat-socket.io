import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  error = '';
  success = '';

  public user = {
    name: '',
    username: '',    
    password: ''    
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  cleatUser() {
    this.user = {
      name: '',
      username: '',    
      password: ''    
    }; 
  }

  onSubmit() {    
    this.loading = true;    
    this.userService
      .create(this.user)
      .subscribe(data => {        
        this.success = 'User created successfully';
        setTimeout(() => {
          this.success = '';
        }, 3000);

        this.loading = false;
        this.cleatUser();
      },
      error => {          
        this.error = error;
        setTimeout(() => {
          this.error = '';
        }, 3000);
          
        this.loading = false;
      });
  }
}
