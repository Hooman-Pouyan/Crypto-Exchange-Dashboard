import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSessionsComponent } from './user-sessions.component';

describe('UserSessionsComponent', () => {
  let component: UserSessionsComponent;
  let fixture: ComponentFixture<UserSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSessionsComponent]
    });
    fixture = TestBed.createComponent(UserSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
