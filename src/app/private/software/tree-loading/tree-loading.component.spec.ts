import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLoadingComponent } from './tree-loading.component';

describe('TreeLoadingComponent', () => {
  let component: TreeLoadingComponent;
  let fixture: ComponentFixture<TreeLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeLoadingComponent]
    });
    fixture = TestBed.createComponent(TreeLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
