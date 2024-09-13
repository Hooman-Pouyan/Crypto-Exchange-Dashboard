import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderContainerComponent } from './loader-container.component';

describe('LoaderContainerComponent', () => {
  let component: LoaderContainerComponent;
  let fixture: ComponentFixture<LoaderContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderContainerComponent],
    });
    fixture = TestBed.createComponent(LoaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
