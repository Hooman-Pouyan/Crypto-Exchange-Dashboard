import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAddressContainerComponent } from './network-address-container.component';

describe('NetworkAddressContainerComponent', () => {
  let component: NetworkAddressContainerComponent;
  let fixture: ComponentFixture<NetworkAddressContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkAddressContainerComponent]
    });
    fixture = TestBed.createComponent(NetworkAddressContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
