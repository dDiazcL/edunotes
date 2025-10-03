import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ui } from 'src/app/services/ui';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  email: string = '';

  constructor(private auth: Auth,private router: Router, private ui: Ui) {}

  ngOnInit() {
    const extras = this.router.getCurrentNavigation();

    if (extras?.extras?.state?.['email']) {
      this.email = extras.extras.state['email'];
    } else {
      const user = this.auth.getUSer();
      if (user) {
        this.email = user.email;
      }
    }
  }

  goToProfile() {
    this.ui.blurActiveElement();
    this.router.navigate(['/tabs/profile']);
  }

  goToNotes() {
    this.ui.blurActiveElement();
    this.router.navigate(['/tabs/notes']);
  }

  logout() {
    this.ui.blurActiveElement();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
