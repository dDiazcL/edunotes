import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Auth } from 'src/app/services/auth';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {

  email = '';
  password = '';

  constructor( private router: Router, private auth: Auth, private toastCtrl: ToastController, private emailService: EmailService) {}

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

      await this.emailService.sendEmail({
        email: this.email,
        user_name: this.email.split('@'[0]),
        user_email: this.email,
        message: `¡Bienvenido/a a EduNotes! 🎓 Tu cuenta ha sido registrada con éxito.`
      });

      this.router.navigateByUrl('/login', {replaceUrl: true});
    } else {
      this.presentToast('El usuario ya existe ❌');
    }
  }
  
  goToLogin() {
    this.router.navigateByUrl('/login')
  }
}
