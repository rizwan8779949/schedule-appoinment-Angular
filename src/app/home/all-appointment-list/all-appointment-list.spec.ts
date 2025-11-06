import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppointmentList } from './all-appointment-list';

describe('AllAppointmentList', () => {
  let component: AllAppointmentList;
  let fixture: ComponentFixture<AllAppointmentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAppointmentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAppointmentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
