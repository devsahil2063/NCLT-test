import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrpAppointments } from './irp-appointments';

describe('IrpAppointments', () => {
  let component: IrpAppointments;
  let fixture: ComponentFixture<IrpAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrpAppointments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrpAppointments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
