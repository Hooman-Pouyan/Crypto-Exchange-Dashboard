import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NetworkAddressContainerComponent} from "./network-address-container/network-address-container.component";

const routes: Routes = [
  {path: '', component: NetworkAddressContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkAddressRoutingModule {
}
