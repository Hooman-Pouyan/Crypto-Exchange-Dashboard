import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path: "", redirectTo: "Dashboard", pathMatch: "full"},
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule), data: { animation: 'routeAnimations' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
