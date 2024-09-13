import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommissionComponent } from './user-commission.component';

describe('UserCommissionComponent', () => {
  let component: UserCommissionComponent;
  let fixture: ComponentFixture<UserCommissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCommissionComponent]
    });
    fixture = TestBed.createComponent(UserCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
