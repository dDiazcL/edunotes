import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private router: Router) {}

  login() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Por favor completa todos los campos');
      return;
    }

    // 🔹 Validación básica (aquí luego puedes conectar a backend)
    if (this.email === 'test@mail.com' && this.password === '1234') {
      const user = {
        name: 'Usuario de Prueba',
        email: this.email,
        image: 'https://ionicframework.com/docs/img/demos/avatar.svg'
      };

      // Guardamos el usuario en localStorage
      localStorage.setItem('userProfile', JSON.stringify(user));

      // 🔹 Limpiamos el foco (evita warning de aria-hidden)
      document.activeElement && (document.activeElement as HTMLElement).blur();

      // 🔹 Navegación limpia (reemplaza la página de login por home)
      this.navCtrl.navigateRoot('/home');
    } else {
      alert('Credenciales incorrectas ❌');
    }
  }
}
