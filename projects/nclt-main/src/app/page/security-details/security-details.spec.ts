import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDetails } from './security-details';

describe('SecurityDetails', () => {
  let component: SecurityDetails;
  let fixture: ComponentFixture<SecurityDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
