import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherClaims } from './other-claims';

describe('OtherClaims', () => {
  let component: OtherClaims;
  let fixture: ComponentFixture<OtherClaims>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherClaims]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherClaims);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
