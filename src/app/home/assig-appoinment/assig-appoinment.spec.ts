import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigAppoinment } from './assig-appoinment';

describe('AssigAppoinment', () => {
  let component: AssigAppoinment;
  let fixture: ComponentFixture<AssigAppoinment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigAppoinment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigAppoinment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
