import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  userEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { email: string };
    this.userEmail = state?.email || 'Usuario';
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
