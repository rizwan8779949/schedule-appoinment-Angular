import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDoctorWithAppointment } from './assign-doctor-with-appointment';

describe('AssignDoctorWithAppointment', () => {
  let component: AssignDoctorWithAppointment;
  let fixture: ComponentFixture<AssignDoctorWithAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDoctorWithAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDoctorWithAppointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
