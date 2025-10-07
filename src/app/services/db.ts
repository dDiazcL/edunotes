import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class Db {

  public database!: SQLiteObject;
  private readonly DB_NAME = 'appdata.db';

  //SQL para crear la tabla de notas
  tblNotes: string = `CREATE TABLE IF NOT EXISTS notes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    favorite INTEGER DEFAULT 0
  );`;

  //Observable para emitir la lista de notas
  private listaNotas = new BehaviorSubject<Note[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController) 
  {this.init();}

  private async init() {
    await this.platform.ready();
    try {
      const dbObj = await this.sqlite.create({
        name: this.DB_NAME,
        location: 'default'
      });
      this.database = dbObj;
      await this.database.executeSql(this.tblNotes, []);
      this.presentToast('Base de datos lista ✅');
      this.isDbReady.next(true);
      this.loadNotes();
    } catch (err: any) {
      this.presentToast('Error al crear DB: ' + (err?.message || err));
      console.error('SQLite init error', err);
    }
  }

  //Cargar notas desde la DB y actualizar BehaviorSubject
  async loadNotes() {
    if (!this.database) return;
    try {
      const res = await this.database.executeSql('SELECT * FROM notes ORDER BY id DESC', []);
      const items: Note[] = [];
      for (let i = 0; i < res.rows.lenght; i++) {
        const r = res.rows.item(i);
        items.push({
          id: r.id,
          title: r.title,
          content: r.content,
          favorite: !!r.favorite
        });
      }
      this.listaNotas.next(items);
    } catch (err: any){
      console.error('loadNotes error', err);
    }
  }

  //CRUD

  async addNote(title: string, content: string) {
    const sql = 'INSERT INTO notes (title, content, favorite) VALUES (?, ?, ?)';
    try {
      await this.database.executeSql(sql, [title, content, 0]);
      await this.loadNotes();
    } catch (err: any) {
      console.error('addNote error', err);
    }
  }

  async updateNote(id: number, title: string, content: string, favorite: boolean) {
    const sql = 'UPDATE notes SET title=?, content=?, favorite=? WHERE id=?';
    try {
      await this.database.executeSql(sql, [title, content, favorite ? 1 : 0, id]);
      await this.loadNotes();
    } catch (err: any) {
      console.error('updateNote', err);
    }
  }

  async deleteNote(id: number) {
    const sql = 'DELETE FROM notes WHERE id=?';
    try {
      await this.database.executeSql(sql, [id]);
      await this.loadNotes();
    } catch (err: any){
      console.error('deleteNote error', err);
    }
  }

  //Observables para que las paginas se subscriban

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchNotes(): Observable<Note[]> {
    return this.listaNotas.asObservable();
  }

  //Toast helper
  private async presentToast(message: string) {
    const t = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom'
    });
    await t.present();
  }
}
