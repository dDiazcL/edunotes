import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ui } from 'src/app/services/ui';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false
})
export class ResetPasswordPage {
  email: string = '';

  constructor(private router: Router, private ui: Ui, private toastController: ToastController) {}

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  async resetPassword() {
    if (!this.email) {
      this.presentToast('Por favor ingresa tu correo 📧')
      return;
      }

      const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal.test(this.email)) {
        this.presentToast('Ingresa un correo válido 📬');
        return;
      }

      this.presentToast('Se envió el enlace a tu correo ✅', 'success');

      this.ui.blurActiveElement();
      this.router.navigate(['/login'])
  }
}
