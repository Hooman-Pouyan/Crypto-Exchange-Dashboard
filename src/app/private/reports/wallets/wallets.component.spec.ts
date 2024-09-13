import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsComponent } from './wallets.component';

describe('WalletsComponent', () => {
  let component: WalletsComponent;
  let fixture: ComponentFixture<WalletsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletsComponent]
    });
    fixture = TestBed.createComponent(WalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
