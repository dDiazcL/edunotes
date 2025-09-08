import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    if (this.email && this.password) {
      this.router.navigate(['home']);
    } else {
      alert('Debes ingresar usuario y contraseña');
    }
  }

  goToReset() {
    this.router.navigate(['/reset-password']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
