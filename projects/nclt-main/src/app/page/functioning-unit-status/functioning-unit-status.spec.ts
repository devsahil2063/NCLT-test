import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctioningUnitStatus } from './functioning-unit-status';

describe('FunctioningUnitStatus', () => {
  let component: FunctioningUnitStatus;
  let fixture: ComponentFixture<FunctioningUnitStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctioningUnitStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctioningUnitStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
