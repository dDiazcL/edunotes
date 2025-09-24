import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ui } from 'src/app/services/ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private ui: Ui) {}

  ngOnInit() {
    let extras = this.router.getCurrentNavigation();

    if (extras?.extras.state) {
      this.email = extras?.extras.state['email'];
      this.password = extras?.extras.state['password'];
    }
  }

  goToProfile() {
    this.ui.blurActiveElement();
    this.router.navigate(['/profile']);
  }

  goToNotes() {
    this.ui.blurActiveElement();
    this.router.navigate(['/notes']);
  }

  logout() {
    this.ui.blurActiveElement();
    this.router.navigate(['/login']);
  }
}
