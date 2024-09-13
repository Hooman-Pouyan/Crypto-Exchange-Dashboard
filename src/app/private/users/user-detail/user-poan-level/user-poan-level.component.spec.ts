import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPoanLevelComponent } from './user-poan-level.component';

describe('UserPoanLevelComponent', () => {
  let component: UserPoanLevelComponent;
  let fixture: ComponentFixture<UserPoanLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPoanLevelComponent]
    });
    fixture = TestBed.createComponent(UserPoanLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
