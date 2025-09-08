import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false,
})
export class ResetPasswordPage implements OnInit {

  email: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendReset() {
    if(this.email) {
      alert(`Se ha enviado un correo a ${this.email} para restrablecer la contraseña.`);
      this.router.navigate(['/login']);
    } else {
      alert('Por favor ingresa tu correo electronico.');
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }



}
