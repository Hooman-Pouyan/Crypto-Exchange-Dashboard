import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbContainerComponent } from './breadcrumb-container.component';

describe('BreadcrumbContainerComponent', () => {
  let component: BreadcrumbContainerComponent;
  let fixture: ComponentFixture<BreadcrumbContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbContainerComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
