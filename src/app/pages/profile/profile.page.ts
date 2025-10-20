import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Auth } from 'src/app/services/auth';
import { Ui } from 'src/app/services/ui';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    bio: '',
    image: ''
  };
  isEditing = false;

  constructor(private ui: Ui, private auth: Auth) {}

  async ngOnInit() {
    const user = await this.auth.getUser();
    if (user) this.user = user;

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) this.user.image = savedImage;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async saveProfile() {
    await this.auth.saveUser(this.user.email, this.user.password);
    localStorage.setItem('profileImage', this.user.image);
    this.isEditing = false;
    this.ui.presentToast('Perfil actualziado ✅');
  }

  async deleteProfile() {
    await this.auth.logout();
    localStorage.removeItem('profileImage');
    this.user = { name: '', email: '', password: '', bio: '', image: ''};
    this.ui.presentToast('Perfil eliminado 🗑️');
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.user.image = image.dataUrl!;
      await Filesystem.writeFile({
        path: `profile_${this.user.email}.txt`,
        data: image.dataUrl!,
        directory: Directory.Data
      });
      localStorage.setItem('profileImage', image.dataUrl!);
      this.ui.presentToast('Foto Tomada 📷');
    } catch (err) {
      console.error('Error tomando foto', err);
    }
  }

  async pickImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      this.user.image = image.dataUrl!;
      await Filesystem.writeFile({
        path: `profile_${this.user.email}.txt`,
        data: image.dataUrl!,
        directory: Directory.Data
      });
      localStorage.setItem('profileImage', image.dataUrl!);
      this.ui.presentToast('Imagen seleccionada 🖼️');
    } catch (err) {
      console.error('Error seleccionando imagen', err);
    }
  }
}

