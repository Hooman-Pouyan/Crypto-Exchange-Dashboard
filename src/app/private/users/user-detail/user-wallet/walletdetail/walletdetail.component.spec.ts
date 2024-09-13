import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletdetailComponent } from './walletdetail.component';

describe('WalletdetailComponent', () => {
  let component: WalletdetailComponent;
  let fixture: ComponentFixture<WalletdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletdetailComponent]
    });
    fixture = TestBed.createComponent(WalletdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
