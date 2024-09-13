import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuContainerComponent } from './sidemenu-container.component';

describe('SidemenuContainerComponent', () => {
  let component: SidemenuContainerComponent;
  let fixture: ComponentFixture<SidemenuContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidemenuContainerComponent],
    });
    fixture = TestBed.createComponent(SidemenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
