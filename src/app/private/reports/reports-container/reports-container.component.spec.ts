import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsContainerComponent } from './reports-container.component';

describe('ReportsContainerComponent', () => {
  let component: ReportsContainerComponent;
  let fixture: ComponentFixture<ReportsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsContainerComponent]
    });
    fixture = TestBed.createComponent(ReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});