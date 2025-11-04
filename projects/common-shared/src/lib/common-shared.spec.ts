import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonShared } from './common-shared';

describe('CommonShared', () => {
  let component: CommonShared;
  let fixture: ComponentFixture<CommonShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonShared]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
