import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocFormation } from './coc-formation';

describe('CocFormation', () => {
  let component: CocFormation;
  let fixture: ComponentFixture<CocFormation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocFormation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocFormation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
