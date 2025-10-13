import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private baseUrl = 'https://example.com/api';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  //CRUD de Notas

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/notes`)
    .pipe(catchError(this.handleError));
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/notes/${id}`)
    .pipe(catchError(this.handleError));
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/notes`, note, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/notes/${note.id}`, note, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notes/${id}`, this.httpOptions)
    .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      //Error del cliente o red
      message = `Error del cliente: ${error.error.message}`;
    } else {
      //error del servidor
      message = `Error del servidor: ${error.error.message}`
    }
    console.error('❌ API Error:', message);
    return throwError(() => new Error(message));
  }
}
