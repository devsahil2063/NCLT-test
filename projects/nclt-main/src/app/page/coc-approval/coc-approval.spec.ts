import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocApproval } from './coc-approval';

describe('CocApproval', () => {
  let component: CocApproval;
  let fixture: ComponentFixture<CocApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocApproval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
