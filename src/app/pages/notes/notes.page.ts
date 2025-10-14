import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Api } from 'src/app/services/api';
import { Db } from 'src/app/services/db';
import { Ui } from 'src/app/services/ui';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: false
})
export class NotesPage implements OnInit{

  notes: Note[] = [];
  apiNotes: any[] = []; //Se guarda lo que viene de la API
  nextId = 1;
  filter: 'all' | 'favorites' = 'all';
  editingNote: Note | null = null;

  constructor(private ui: Ui, private db: Db, private api: Api) {}

  ngOnInit() {
    this.db.dbState().subscribe(ready => {
      if (ready) {
        this.db.fetchNotes().subscribe(data => {
          this.notes = data;
        });
      }
    });

    this.api.getNotes().subscribe({
      next: (data) => {
        const limited = data.slice(0, 5);
        console.log('Datos desde API:', data);
        this.apiNotes = limited;
        this.ui.presentToast('API conectada correctamente ✅');
      },
      error: (err) => {
        console.error('Error al obtener datos de la API', err);
        this.ui.presentToast('Error al conectar con la API ⚠️');
      }
    });
  }

  //Sinc o cons notas desde la API
  async syncWithApi() {
    try {
      this.ui.presentToast('Sincronizando con el servidor...');
      this.api.getNotes().subscribe(async apiNotes => {
        //Se toman los 5 primeros para no saturar
        const limited = apiNotes.slice(0, 5);
        for (let n of limited) {
          await this.db.addNote(n.title, n.content || '');
        }
        this.ui.presentToast('Notas sincronizadas con éxito 🌐');
      });
    } catch (err) {
      console.error('Error al sincronizar:', err);
      this.ui.presentToast('Error al sincronizar ⚠️');
    }
  }

  //Aplicar Filtro
  get applyFilter(): Note[] {
    if (this.filter === 'all') {
      return this.notes;
    } else {
      return this.notes.filter(n => n.favorite);
    }
  }

  async addNote() {
    this.ui.blurActiveElement();
    await this.db.addNote('Nueva nota', '');
    this.ui.presentToast('Nota creada 📝');
  }

  async toggleFavorite(note: Note) {
    note.favorite = !note.favorite;
    await this.db.updateNote(note.id!, note.title, note.content, note.favorite);
    this.ui.presentToast(note.favorite ? 'Marcada como favorita ⭐' : 'Quitada de favoritos 💨');
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
  }

  async updateNote() {
    if (!this.editingNote) return;
    await this.db.updateNote(
      this.editingNote.id!,
      this.editingNote.title,
      this.editingNote.content,
      this.editingNote.favorite
    );
    this.editingNote = null;
    this.ui.presentToast('Nota actualizada ✅');
  }

  async deleteNote(id: number) {
    await this.db.deleteNote(id);
    this.ui.presentToast('Nota eliminada 🗑️');
  }

  cancelEdit() {
    this.editingNote = null;
  }
}
