import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalCreditors } from './operational-creditors';

describe('OperationalCreditors', () => {
  let component: OperationalCreditors;
  let fixture: ComponentFixture<OperationalCreditors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalCreditors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalCreditors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
