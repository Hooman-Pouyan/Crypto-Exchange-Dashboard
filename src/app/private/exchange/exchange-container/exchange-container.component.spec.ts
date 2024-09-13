import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeContainerComponent } from './exchange-container.component';

describe('ExchangeContainerComponent', () => {
  let component: ExchangeContainerComponent;
  let fixture: ComponentFixture<ExchangeContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeContainerComponent]
    });
    fixture = TestBed.createComponent(ExchangeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
