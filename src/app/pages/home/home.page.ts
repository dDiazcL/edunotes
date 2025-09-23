import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    let extras = this.router.getCurrentNavigation();

    if (extras?.extras.state) {
      this.email = extras?.extras.state['email'];
      this.password = extras?.extras.state['password'];
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToNotes() {
    this.router.navigate(['/notes']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
