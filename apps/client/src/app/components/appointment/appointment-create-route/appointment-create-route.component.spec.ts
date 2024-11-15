import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentCreateRouteComponent } from './appointment-create-route.component';

describe('AppointmentCreateRouteComponent', () => {
  let component: AppointmentCreateRouteComponent;
  let fixture: ComponentFixture<AppointmentCreateRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCreateRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentCreateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
