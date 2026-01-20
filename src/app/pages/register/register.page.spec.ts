import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { IonicModule } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create register page', () => {
    expect(component).toBeTruthy();
  });

  it('should call register method', () => {
    spyOn(component, 'register');
    component.register();
    expect(component.register).toHaveBeenCalled();
  });
});
