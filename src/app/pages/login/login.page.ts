import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ui } from 'src/app/services/ui';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private ui: Ui, private toastController: ToastController, private auth: Auth) {}

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }

  async login() {
    if (!this.email || !this.password) {
      this.presentToast('Por favor ingresa correo y contraseña ⚠️')
      return;
    }

    const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailVal.test(this.email)){
      this.presentToast('Correo inválido 📧');
      return;
    }

    if (!passwordVal.test(this.password)) {
      this.presentToast('La contraseña debe tener al menos 6 caracteres e incluir letras y numeros 🔑');
      return;
    }

    await this.auth.saveUser(this.email, this.password);
    this.presentToast('Sesion iniciada correctamente 🚀');

    const extras: NavigationExtras = {
      replaceUrl: true,
      state: { email: this.email}
    };

    this.ui.blurActiveElement();
    this.router.navigate(['/tabs/home'], extras);
  }

  goToReset() {
    this.ui.blurActiveElement();
    this.router.navigate(['/reset-password']);
  }
}
