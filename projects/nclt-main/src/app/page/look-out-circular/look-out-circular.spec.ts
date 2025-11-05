import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookOutCircular } from './look-out-circular';

describe('LookOutCircular', () => {
  let component: LookOutCircular;
  let fixture: ComponentFixture<LookOutCircular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookOutCircular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookOutCircular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
