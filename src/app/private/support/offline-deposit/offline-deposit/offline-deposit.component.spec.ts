import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineDepositComponent } from './offline-deposit.component';

describe('OfflineDepositComponent', () => {
  let component: OfflineDepositComponent;
  let fixture: ComponentFixture<OfflineDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfflineDepositComponent]
    });
    fixture = TestBed.createComponent(OfflineDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
