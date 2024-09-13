import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniSidemenuComponent } from './mini-sidemenu.component';

describe('MiniSidemenuComponent', () => {
  let component: MiniSidemenuComponent;
  let fixture: ComponentFixture<MiniSidemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniSidemenuComponent]
    });
    fixture = TestBed.createComponent(MiniSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
