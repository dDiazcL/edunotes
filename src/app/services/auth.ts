import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Auth {

  private readonly STORAGE_KEY = 'app_users';
  private readonly SESSION_KEY = 'logged_user';

  constructor() {}

  // Registrar usuario

  async registerUser(email: string, password: string): Promise<boolean> {
    const users = this.getAllUsers();

    const exists = users.find(u => u.email === email);
    if(exists) {
      console.warn('El usuario ya existe');
      return false;
    }

    users.push({ email, password });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    console.log('Usuario registrado ✅');
    return true;
  }

  // Guardar sesion activa

  async saveUser(email: string, password: string): Promise<void> {
    const users = this.getAllUsers();
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      throw new Error('Usuario o contraseña invalidos');
    }

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(found));
    console.log('Usuario logeado ✅');
  }

  // Obtener usuario actual logeado

  async getUser(): Promise<any | null> {
    const user = localStorage.getItem(this.SESSION_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Cerrar sesion

  async logout(): Promise<void> {
    localStorage.removeItem(this.SESSION_KEY);
    console.log('👋 Sesion cerrada');
  }

  // Verificar si hay sesion activa

  async isAuthenticated(): Promise<boolean> {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  // Obtener todos los usuarios (interno)
  private getAllUsers(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
