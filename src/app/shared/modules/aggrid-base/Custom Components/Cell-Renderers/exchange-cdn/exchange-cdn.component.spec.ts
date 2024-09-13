import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeCDNComponent } from './exchange-cdn.component';

describe('ExchangeCDNComponent', () => {
  let component: ExchangeCDNComponent;
  let fixture: ComponentFixture<ExchangeCDNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeCDNComponent]
    });
    fixture = TestBed.createComponent(ExchangeCDNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
