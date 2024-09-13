import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionContainerComponent } from './version-container.component';

describe('VersionContainerComponent', () => {
  let component: VersionContainerComponent;
  let fixture: ComponentFixture<VersionContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersionContainerComponent]
    });
    fixture = TestBed.createComponent(VersionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
