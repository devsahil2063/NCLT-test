import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalAssesment } from './internal-assesment';

describe('InternalAssesment', () => {
  let component: InternalAssesment;
  let fixture: ComponentFixture<InternalAssesment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalAssesment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalAssesment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
