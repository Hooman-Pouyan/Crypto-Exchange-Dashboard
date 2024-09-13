import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clubContainerComponent } from './club-container.component';

describe('clubContainerComponent', () => {
  let component: clubContainerComponent;
  let fixture: ComponentFixture<clubContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [clubContainerComponent]
    });
    fixture = TestBed.createComponent(clubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
