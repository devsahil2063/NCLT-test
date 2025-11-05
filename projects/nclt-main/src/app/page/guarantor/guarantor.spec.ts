import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guarantor } from './guarantor';

describe('Guarantor', () => {
  let component: Guarantor;
  let fixture: ComponentFixture<Guarantor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guarantor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guarantor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
