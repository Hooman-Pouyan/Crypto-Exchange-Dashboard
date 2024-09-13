import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clubDetailComponent } from './club-detail.component';

describe('clubDetailComponent', () => {
  let component: clubDetailComponent;
  let fixture: ComponentFixture<clubDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [clubDetailComponent]
    });
    fixture = TestBed.createComponent(clubDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
