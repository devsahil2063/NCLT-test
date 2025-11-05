import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingArrangements } from './banking-arrangements';

describe('BankingArrangements', () => {
  let component: BankingArrangements;
  let fixture: ComponentFixture<BankingArrangements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingArrangements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingArrangements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
