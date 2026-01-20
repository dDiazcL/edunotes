import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesPage } from './notes.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Ui } from 'src/app/services/ui';
import { Api } from 'src/app/services/api';
import { Db } from 'src/app/services/db';

import { of, BehaviorSubject } from 'rxjs';

class DbMock {
  private dbReady = new BehaviorSubject<boolean>(true);

  dbState() {
    return this.dbReady.asObservable();
  }

  fetchNotes() {
    return of([]);
  }

  addNote() {
    return Promise.resolve();
  }

  updateNote() {
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
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        Ui,
        Api,
        { provide: Db, useClass: DbMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create notes page', () => {
    expect(component).toBeTruthy();
  });

  it('should call addNote method', async () => {
    spyOn(component['db'], 'addNote').and.returnValue(Promise.resolve());
    await component.addNote();
    expect(component['db'].addNote).toHaveBeenCalled();
  });
});
