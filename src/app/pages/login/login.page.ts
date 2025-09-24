import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Ui } from 'src/app/services/ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private ui: Ui) {}

  login() {
    if (!this.email || !this.password) {
      return;
    }

    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {
        email: this.email,
        password: this.password
      }
    };

    this.router.navigate(['/home'], extras);
  }

  goToReset() {
    this.ui.blurActiveElement();
    this.router.navigate(['/reset-password']);
  }
}
