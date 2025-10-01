import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly STORAGE_KEY = 'userProfile';

  //Guardar usuario (simulacion de Login)
  login(email: string, password: string) {
    const user = { email, password};
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  //Eliminar usuario (logout)
  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  //Obtener usuario actual
  getUSer() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }

  //Verificar si existe una sesion activa
  isAuthenticated(): boolean {
    return !!this.getUSer();
  }
  
}
