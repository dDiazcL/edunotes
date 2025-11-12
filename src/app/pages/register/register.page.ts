import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {

  email = '';
  password = '';

  constructor( private router: Router, private auth: Auth, private toastCtrl: ToastController) {}

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }

  async register() {
    if(!this.email || !this.password) {
      this.presentToast('Completa todos los campos ⚠️');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(this.email)) {
      this.presentToast('Correo invalido 📧');
      return;
    }

    if (!passRegex.test(this.password)) {
      this.presentToast('La contraseña debe tener minimo 6 caracteres con letras y numeros 🔑');
      return;
    }

    const created = await this.auth.registerUser(this.email, this.password);
    if(created) {
      await this.presentToast('Registro exitoso 🎉', 'succes');
      this.router.navigateByUrl('/login', {replaceUrl: true});
    } else {
      this.presentToast('El usuario ya existe ❌');
    }
  }
  
  goToLogin() {
    this.router.navigateByUrl('/login')
  }
}
