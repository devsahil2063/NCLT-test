import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrtSuit } from './drt-suit';

describe('DrtSuit', () => {
  let component: DrtSuit;
  let fixture: ComponentFixture<DrtSuit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrtSuit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrtSuit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
