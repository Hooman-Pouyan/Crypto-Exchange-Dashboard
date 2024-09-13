import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardInfoContainerComponent } from './dashboard-info-container/dashboard-info-container.component';

const routes: Routes = [
  {path: "", component: DashboardInfoContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardInfoRoutingModule { }
