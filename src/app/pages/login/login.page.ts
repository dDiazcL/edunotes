import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  goToReset() {
    this.router.navigate(['/reset-password']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
