import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ui } from 'src/app/services/ui';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: false
})
export class NotFoundPage implements OnInit {

  constructor(private router: Router, private ui: Ui) { }

  ngOnInit() {
  }

  goHome() {
    this.ui.blurActiveElement();

    this.router.navigate(['/tabs/home']);
  }

  goLogin() {
    this.ui.blurActiveElement();
    this.router.navigate(['/login']);
  }
}
