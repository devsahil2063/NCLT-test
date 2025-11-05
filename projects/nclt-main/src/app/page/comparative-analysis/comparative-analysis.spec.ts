import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeAnalysis } from './comparative-analysis';

describe('ComparativeAnalysis', () => {
  let component: ComparativeAnalysis;
  let fixture: ComponentFixture<ComparativeAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparativeAnalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparativeAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
