import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForensicAudit } from './forensic-audit';

describe('ForensicAudit', () => {
  let component: ForensicAudit;
  let fixture: ComponentFixture<ForensicAudit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForensicAudit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForensicAudit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
