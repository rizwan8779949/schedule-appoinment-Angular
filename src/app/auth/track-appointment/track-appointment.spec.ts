import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAppointment } from './track-appointment';

describe('TrackAppointment', () => {
  let component: TrackAppointment;
  let fixture: ComponentFixture<TrackAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackAppointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
