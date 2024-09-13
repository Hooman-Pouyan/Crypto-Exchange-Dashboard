import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyFilterComponent } from './currency-filter.component';

describe('CurrencyFilterComponent', () => {
  let component: CurrencyFilterComponent;
  let fixture: ComponentFixture<CurrencyFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyFilterComponent]
    });
    fixture = TestBed.createComponent(CurrencyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
