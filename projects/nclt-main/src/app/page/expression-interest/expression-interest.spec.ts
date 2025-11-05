import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionInterest } from './expression-interest';

describe('ExpressionInterest', () => {
  let component: ExpressionInterest;
  let fixture: ComponentFixture<ExpressionInterest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionInterest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressionInterest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
