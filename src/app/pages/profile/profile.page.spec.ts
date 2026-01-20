import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { IonicModule } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create profile page', () => {
    expect(component).toBeTruthy();
  });

  it('should call takePhoto method', () => {
    spyOn(component, 'takePhoto');
    component.takePhoto();
    expect(component.takePhoto).toHaveBeenCalled();
  });
});
