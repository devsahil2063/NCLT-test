import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionPlansRegistery } from './resolution-plans-registery';

describe('ResolutionPlansRegistery', () => {
  let component: ResolutionPlansRegistery;
  let fixture: ComponentFixture<ResolutionPlansRegistery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolutionPlansRegistery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolutionPlansRegistery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
