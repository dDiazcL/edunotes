import { Component, OnInit } from '@angular/core';

interface Note {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: false,
})
export class NotesPage implements OnInit {

  notes: Note[] = [
    {id: 1, title: 'Primera nota', content: 'Contenido de la primera nota.'},
    {id: 2, title: 'Segunda nota', content: 'Contenido de la segunda nota.'}
  ];

  constructor() { }

  ngOnInit() {
  }

  addNote() {
    const newNote: Note = {
      id: this.notes.length + 1,
      title: `Nueva nota ${this.notes.length + 1}`,
      content: 'Contenido vacio...'
    };
    this.notes.push(newNote);
  }

}
