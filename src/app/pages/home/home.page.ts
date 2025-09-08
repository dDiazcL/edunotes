import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeInUp',[
      state('void',style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class HomePage implements OnInit{

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToNotes() {
    this.router.navigate(['/notes']);
  }
}
