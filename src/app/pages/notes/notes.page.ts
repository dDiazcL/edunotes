import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/services/db';
import { Ui } from 'src/app/services/ui';

interface Note {
  id: number;
  title: string;
  content: string;
  favorite: boolean;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: false
})
export class NotesPage implements OnInit{

  notes: Note[] = [];
  nextId = 1;
  filter: 'all' | 'favorites' = 'all';
  editingNote: Note | null = null;

  constructor(private ui: Ui, private db: Db) {}

  ngOnInit() {
    this.db.dbState().subscribe(ready => {
      if (ready) {
        this.db.fetchNotes().subscribe(list => {
          this.notes = list;
        });
      }
    });
  }

  get filteredNotes() {
    return this.filter === 'all' ? this.notes : this.notes.filter(n => n.favorite);
  }

  addNote() {

    this.ui.blurActiveElement();

    this.db.addNote('Nueva nota', '');
  }

  toggleFavorite(note: Note) {
    this.db.updateNote(note.id, note.title, note.content, !note.favorite);
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
  }

  updateNote() {
    if (!this.editingNote) return;
    this.db.updateNote(this.editingNote.id, this.editingNote.title, this.editingNote.content, !!this.editingNote.favorite);
    this.editingNote = null;
  }

  deleteNote(id: number) {
    this.db.deleteNote(id);
  }

  cancelEdit() {
    this.editingNote = null;
  }
}
