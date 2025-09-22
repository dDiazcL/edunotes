import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {
  user = {
    name: '',
    email: '',
    bio: ''
  };

  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.isEditing = false;
  }

  deleteProfile() {
    this.user = { name: '', email: '', bio: '' };
  }
}

