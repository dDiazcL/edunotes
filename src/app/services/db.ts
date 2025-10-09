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
  {this.crearBD();}

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'notes.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast('Base de datos creada ✅');
        this.crearTablas();
      }).catch(e => this.presentToast(`Error al crear BD: ${e.message || e}`));
    });

  }

  crearTablas() {
    this.database.executeSql(this.tblNotes, [])
    .then(() => {
      this.presentToast('Tabla de notas lista 📝');
      this.isDbReady.next(true);
      this.loadNotes();
    })
    .catch(e => this.presentToast(`Error al crear tabla: ${e.message || e}`));
  }

  //Cargar notas desde la DB y actualizar BehaviorSubject
  async loadNotes() {
    if (!this.database) return;
    try {
      const res = await this.database.executeSql('SELECT * FROM notes ORDER BY id DESC', []);
      const items: Note[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        const r = res.rows.item(i);
        items.push({
          id: r.id,
          title: r.title,
          content: r.content,
          favorite: r.favorite === 1
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
