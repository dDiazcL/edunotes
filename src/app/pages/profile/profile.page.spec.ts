import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear la página de perfil de usuario', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar el método takePhoto()', () => {
    spyOn(component, 'takePhoto');
    component.takePhoto();
    expect(component.takePhoto).toHaveBeenCalled();
  });
});
