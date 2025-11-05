import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDashboard } from './timeline-dashboard';

describe('TimelineDashboard', () => {
  let component: TimelineDashboard;
  let fixture: ComponentFixture<TimelineDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
