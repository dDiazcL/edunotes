import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  user = {
    name: '',
    email: '',
    bio: '',
    image: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  };

  isEditing = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    localStorage.setItem('userProfile',JSON.stringify(this.user));
    this.isEditing = false;
    alert('Perfil actualizado con exito 🚀');
  }

  deleteProfile() {
    localStorage.removeItem('userProfile');
    this.user = {
      name: '',
      email: '',
      bio: '',
      image: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    };
    alert('Perfil Eliminado 🗑️')
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string;
        localStorage.setItem('userProfile',JSON.stringify(this.user));
      }
      reader.readAsDataURL(file);
    }
  }

  resetImage() {
    this.user.image = 'https://ionicframework.com/docs/img/demos/avatar.svg';
    localStorage.setItem('userProfile',JSON.stringify(this.user));
    alert('Foto de Perfil restablecida ✅');
  }

  logout() {
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }
}
