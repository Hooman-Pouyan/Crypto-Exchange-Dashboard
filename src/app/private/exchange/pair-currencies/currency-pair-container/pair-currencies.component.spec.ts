import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairCurrenciesComponent } from './pair-currencies.component';

describe('PairCurrenciesComponent', () => {
  let component: PairCurrenciesComponent;
  let fixture: ComponentFixture<PairCurrenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PairCurrenciesComponent]
    });
    fixture = TestBed.createComponent(PairCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
