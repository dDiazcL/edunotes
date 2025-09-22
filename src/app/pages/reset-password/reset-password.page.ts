import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false
})
export class ResetPasswordPage {
  email: string = '';

  constructor(private router: Router) {}

  resetPassword() {
    if (this.email) {
      this.router.navigate(['/login']);
    }
  }
}
