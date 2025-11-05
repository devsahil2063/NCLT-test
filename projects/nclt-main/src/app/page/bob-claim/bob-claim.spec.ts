import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BobClaim } from './bob-claim';

describe('BobClaim', () => {
  let component: BobClaim;
  let fixture: ComponentFixture<BobClaim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BobClaim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BobClaim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
