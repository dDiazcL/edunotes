import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private db!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.initDB();
  }

  async initDB() {
    await this.platform.ready();
    try {
      this.db = await this.sqlite.create({
        name: 'users.db',
        location: 'default'
      });

      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          password TEXT,
          isLoggedIn INTEGER DEFAULT 0
        );
      `, []);

      console.log('Base de datos de usuarios lista ✅');
    } catch (err) {
      console.error('Error creando la base de datos:', err);
    }
  }
  // Guardar o actualizar usuario
  async saveUser(email: string, password: string) {
    const sql = 'INSERT OR REPLACE INTO users (email, password, isLoggedIn) VALUES(?, ?, 1)';
    await this.db.executeSql(sql, [email, password]);
  }

  // Obtener usuario actual logeado
  async getUser(): Promise<any | null> {
    const res = await this.db.executeSql('SELECT * FROM users WHERE isLoggedIn = 1 LIMIT 1', []);
    if (res.rows.length > 0) {
      return res.rows.item(0);
    }
    return null;
  }

  //Cerrar cesion
  async logout() {
    await this.db.executeSql('UPDATE users SET isLoggedIn = 0', []);
  }

  //Verificar sesion activa
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    return !!user;
  }
}
