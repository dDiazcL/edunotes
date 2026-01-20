import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Ui {

  constructor(private toastCtrl: ToastController) {}

  async presentToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color
    });
    await toast.present();
  }

  blurActiveElement(): void {
    if(document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
