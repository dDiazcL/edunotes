import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeInUp',[
      state('void', style({ opacity: 0,transform: 'translateY(20px)'})),
      transition(':enter', [
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) { }

  login() {
    if (this.email && this.password) {
      const user = {
        name: 'Usuario',
        email: this.email,
        bio: 'Bienvenido a Edunotes 🚀',
        image: 'https://ionicframework.com/docs/img/demos/avatar.svg'
      };

      localStorage.setItem('userProfile',JSON.stringify(user));

      document.activeElement && (document.activeElement as HTMLElement).blur();
      this.navCtrl.navigateRoot('/home');
    } else {
      alert('Debes ingresar usuario y contraseña');
    }
  }

  goToReset() {
    this.navCtrl.navigateRoot(['/reset-password']);
  }

  ngOnInit() {
  }

}
