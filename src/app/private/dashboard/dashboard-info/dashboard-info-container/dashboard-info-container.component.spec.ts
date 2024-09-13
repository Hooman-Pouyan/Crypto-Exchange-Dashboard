import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfoContainerComponent } from './dashboard-info-container.component';

describe('DashboardInfoContainerComponent', () => {
  let component: DashboardInfoContainerComponent;
  let fixture: ComponentFixture<DashboardInfoContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInfoContainerComponent]
    });
    fixture = TestBed.createComponent(DashboardInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
