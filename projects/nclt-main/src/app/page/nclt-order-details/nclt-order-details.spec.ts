import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcltOrderDetails } from './nclt-order-details';

describe('NcltOrderDetails', () => {
  let component: NcltOrderDetails;
  let fixture: ComponentFixture<NcltOrderDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcltOrderDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcltOrderDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
