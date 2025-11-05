import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SARFAESIDetails } from './sarfaesi-details';

describe('SARFAESIDetails', () => {
  let component: SARFAESIDetails;
  let fixture: ComponentFixture<SARFAESIDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SARFAESIDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SARFAESIDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
