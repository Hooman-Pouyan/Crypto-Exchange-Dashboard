import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubCommissionComponent } from './club-commission.component';

describe('ClubCommissionComponent', () => {
  let component: ClubCommissionComponent;
  let fixture: ComponentFixture<ClubCommissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubCommissionComponent]
    });
    fixture = TestBed.createComponent(ClubCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
