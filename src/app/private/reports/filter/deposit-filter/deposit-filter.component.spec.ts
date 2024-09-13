import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositFilterComponent } from './deposit-filter.component';

describe('DepositFilterComponent', () => {
  let component: DepositFilterComponent;
  let fixture: ComponentFixture<DepositFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositFilterComponent]
    });
    fixture = TestBed.createComponent(DepositFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
