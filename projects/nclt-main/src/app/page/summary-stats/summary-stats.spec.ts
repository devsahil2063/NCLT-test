import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStats } from './summary-stats';

describe('SummaryStats', () => {
  let component: SummaryStats;
  let fixture: ComponentFixture<SummaryStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
