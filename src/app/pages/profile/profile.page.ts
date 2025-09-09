import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  user = {
    name: 'Eduardo Cortez',
    email: 'eduardocortez@gmail.com',
    bio: 'Estudiante de Ingieneria en Informatica',
    image: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  };

  isEditing = false;

  constructor() { }

  ngOnInit() {
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.isEditing = false;
    alert('Perfil actualizado con exito 🚀');
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

}
