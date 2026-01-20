import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NotesPage } from './notes.page';

describe('NotesPage', () => {
  let component: NotesPage;
  let fixture: ComponentFixture<NotesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear la página de notas', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar el método addNote()', () => {
    spyOn(component, 'addNote');
    component.addNote();
    expect(component.addNote).toHaveBeenCalled();
  });
});
