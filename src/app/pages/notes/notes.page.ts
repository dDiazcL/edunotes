import { Component, OnInit } from '@angular/core';

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
  standalone: false,
})
export class NotesPage implements OnInit {

  notes: Note[] = [];
  isEditing = false;
  selectedNote: Note | null = null;
  filterFavorites = false;

  constructor() { }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }

  saveNotes() {
    localStorage.setItem('userNotes', JSON.stringify(this.notes));
  }

  addNote() {
    const newNote: Note = {
      id: this.notes.length + 1,
      title: `Nueva nota ${this.notes.length + 1}`,
      content: 'Contenido vacio...',
      favorite: false
    };
    this.notes.push(newNote);
    this.saveNotes();
  }

  editNote(note: Note) {
    this.isEditing = true;
    this.selectedNote = { ...note };
  }

  updateNote() {
    if (this.selectedNote) {
      const index = this.notes.findIndex(n => n.id === this.selectedNote!.id);
      if (index > -1) {
        this.notes[index] = this.selectedNote;
        this.saveNotes();
      }
      this.isEditing = false;
      this.selectedNote = null;
    }
  }

  deleteNote(noteId: number) {
    this.notes = this.notes.filter(n => n.id !== noteId);
    this.saveNotes();
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedNote = null;
  }

  toggleFavorite(note: Note) {
    note.favorite = !note.favorite;
    this.saveNotes();
  }

  toggleFilterFavorites() {
    this.filterFavorites = !this.filterFavorites;
  }

  get filteredNotes(): Note[] {
    if (this.filterFavorites) {
      return this.notes.filter(note => note.favorite);
    }
    return this.notes;
  }
}
