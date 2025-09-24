import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ui } from 'src/app/services/ui';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false
})
export class ResetPasswordPage {
  email: string = '';

  constructor(private router: Router, private ui: Ui) {}

  resetPassword() {
    if (this.email) {
      this.ui.blurActiveElement();
      this.router.navigate(['/login']);
    }
  }
}
