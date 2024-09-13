import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportContainerComponent } from './support-container.component';

describe('SupportContainerComponent', () => {
  let component: SupportContainerComponent;
  let fixture: ComponentFixture<SupportContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportContainerComponent]
    });
    fixture = TestBed.createComponent(SupportContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
