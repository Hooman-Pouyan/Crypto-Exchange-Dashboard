import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTasksComponent } from './user-tasks.component';

describe('UserTasksComponent', () => {
  let component: UserTasksComponent;
  let fixture: ComponentFixture<UserTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTasksComponent]
    });
    fixture = TestBed.createComponent(UserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
