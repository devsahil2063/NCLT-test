import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialCreditors } from './financial-creditors';

describe('FinancialCreditors', () => {
  let component: FinancialCreditors;
  let fixture: ComponentFixture<FinancialCreditors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialCreditors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialCreditors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
