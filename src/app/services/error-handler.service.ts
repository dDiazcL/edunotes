import { Injectable } from '@angular/core';
import {HttpErrorResponse } from '@angular/common/http';
import { Ui } from './ui';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private ui: Ui) {}

  handleError(error: HttpErrorResponse): void {
    if(error.error instanceof ErrorEvent) {
      //Error del lado del cliente o de red
      this.ui.presentToast('Error de conexion. Verifica tu red 🌐')
    } else {
      switch (error.status) {
        case 400:
          this.ui.presentToast('Solicitud envalida (400) ⚠️');
          break;
        case 401:
          this.ui.presentToast('No autorizado (401) 🔒');
          break;
        case 402:
          this.ui.presentToast('Recurso no encontrado (404) ❌')
          break;
        case 500:
          this.ui.presentToast('Error interno del servidor (500) 💥');
          break;
        default:
          this.ui.presentToast(`Error inesperado (${error.status}) 🚨`);
          break;
      }
    }
  }
}
