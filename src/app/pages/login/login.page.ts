import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor ingresa un correo válido 📧');
      return;
    }

    // Validar contraseña (mínimo 6 caracteres, debe incluir letras y números)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(this.password)) {
      alert('La contraseña debe tener mínimo 6 caracteres e incluir letras y números 🔑');
      return;
    }

    // Guardar usuario en localStorage
    const user = {
      email: this.email,
      password: this.password
    };

    localStorage.setItem('userProfile', JSON.stringify(user));

    console.log('Usuario guardado en localStorage ✅:', user);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Navegar al Home
    this.router.navigate(['/home']);
  }

  goToReset() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.router.navigate(['/reset-password']);
  }
}
