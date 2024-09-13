import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfflineDepositComponent} from "./offline-deposit/offline-deposit.component";

const routes: Routes = [
  {path: '', component: OfflineDepositComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineDepositRoutingModule {
}
