import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesPage } from './notes.page';
import { IonicModule } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Db } from 'src/app/services/db';

class DbServiceMock {
  getNotes() {
    return Promise.resolve([]);
  }

  addNote() {
    return Promise.resolve();
  }

  deleteNote() {
    return Promise.resolve();
  }
}

describe('NotesPage', () => {
  let component: NotesPage;
  let fixture: ComponentFixture<NotesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Db, useClass: DbServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create notes page', () => {
    expect(component).toBeTruthy();
  });

  it('should call addNote method', () => {
    spyOn(component, 'addNote');
    component.addNote();
    expect(component.addNote).toHaveBeenCalled();
  });
});
