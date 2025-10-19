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
    const isLogged = await this.auth.isAuthenticated();

    if (isLogged) {
      this.router.navigate(['/tabs/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
