import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private platform: Platform, private auth: Auth) {}

  async ngOnInit() {
    await this.platform.ready();
    console.log('Plataforma lista, verificando sesión...');
    const isLogged = await this.auth.isAuthenticated();

    await new Promise(resolve => setTimeout(resolve, 200));

    if (isLogged) {
      console.log('Sesíon activa, redirigiendo a /tabs/home');
      this.router.navigateByUrl('(/tabs/home');
    } else {
      console.log('Sin Sesión. redirigiendo a /login');
      this.router.navigateByUrl('/login');
    }
  }
}
