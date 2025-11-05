import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherParties } from './other-parties';

describe('OtherParties', () => {
  let component: OtherParties;
  let fixture: ComponentFixture<OtherParties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherParties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherParties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
