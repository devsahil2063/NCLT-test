import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hearing } from './hearing';

describe('Hearing', () => {
  let component: Hearing;
  let fixture: ComponentFixture<Hearing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hearing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hearing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
