import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceReferenceContainerComponent } from './price-reference-container.component';

describe('PriceReferenceContainerComponent', () => {
  let component: PriceReferenceContainerComponent;
  let fixture: ComponentFixture<PriceReferenceContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceReferenceContainerComponent]
    });
    fixture = TestBed.createComponent(PriceReferenceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
