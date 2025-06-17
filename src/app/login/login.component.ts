import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [] // Remove the styleUrls property
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loading = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.loading = true;
    setTimeout(() => {
      // Set regular user data (you can replace with actual authentication logic)
      this.userService.loginAsUser('Eybert Macedo', 'Bibliotecario');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, 1000);
  }

  handleGuestLogin() {
    this.loading = true;
    setTimeout(() => {
      // Set guest user data
      this.userService.loginAsGuest();
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, 1000);
  }
}




