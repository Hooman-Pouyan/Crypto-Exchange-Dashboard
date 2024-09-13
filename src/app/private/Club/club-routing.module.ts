import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {clubContainerComponent} from './club-container/club-container.component';
import {clubDetailComponent} from './level-detail/club-detail-Container/club-detail.component';

const routes: Routes = [
  {path: '', component: clubContainerComponent},
  {
    path: ":id/edit", component: clubDetailComponent, data: {title: 'edit'}, children: [
      {path: "", redirectTo: "info", pathMatch: "full"},
      {path: "info", component: clubDetailComponent, data: {title: 'Basic Information'}},
      {path: "currency", component: clubDetailComponent, data: {title: 'Currency.unit.crypto'}},
      {path: "currency-pair", component: clubDetailComponent, data: {title: 'currency pair.DEFAULT'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clubRoutingModule {
}
