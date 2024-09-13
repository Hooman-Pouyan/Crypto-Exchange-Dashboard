import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPricesComponent } from './currency-prices.component';

describe('CurrencyPricesComponent', () => {
  let component: CurrencyPricesComponent;
  let fixture: ComponentFixture<CurrencyPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyPricesComponent]
    });
    fixture = TestBed.createComponent(CurrencyPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
