import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moratorium } from './moratorium';

describe('Moratorium', () => {
  let component: Moratorium;
  let fixture: ComponentFixture<Moratorium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moratorium]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Moratorium);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
