import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcltFinalApproval } from './nclt-final-approval';

describe('NcltFinalApproval', () => {
  let component: NcltFinalApproval;
  let fixture: ComponentFixture<NcltFinalApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcltFinalApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcltFinalApproval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
