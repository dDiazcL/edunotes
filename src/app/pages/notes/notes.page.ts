import { Component } from '@angular/core';
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
export class NotesPage {

  constructor(private ui: Ui) {}

  notes: Note[] = [];
  nextId = 1;
  filter: 'all' | 'favorites' = 'all';
  editingNote: Note | null = null;

  get filteredNotes() {
    return this.filter === 'all' ? this.notes : this.notes.filter(n => n.favorite);
  }

  addNote() {

    this.ui.blurActiveElement();

    const newNote: Note = { id: this.nextId++, title: 'Nueva Nota', content: '', favorite: false };
    this.notes.push(newNote);
    this.editingNote = { ...newNote };
  }

  toggleFavorite(note: Note) {
    note.favorite = !note.favorite;
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
  }

  updateNote() {
    if (!this.editingNote) return;
    const index = this.notes.findIndex(n => n.id === this.editingNote!.id);
    if (index !== -1) {
      this.notes[index] = { ...this.editingNote };
    }
    this.editingNote = null;
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(n => n.id !== id);
    if (this.editingNote && this.editingNote.id === id) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingNote = null;
  }
}
