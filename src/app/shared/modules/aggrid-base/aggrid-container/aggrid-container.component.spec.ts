import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridContainerComponent } from './aggrid-container.component';

describe('AggridContainerComponent', () => {
  let component: AggridContainerComponent;
  let fixture: ComponentFixture<AggridContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggridContainerComponent]
    });
    fixture = TestBed.createComponent(AggridContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
