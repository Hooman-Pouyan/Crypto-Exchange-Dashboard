import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SupportContainerComponent} from "./support-container/support-container.component";

const routes: Routes = [
  {path: '', redirectTo: "tasks", pathMatch: "full"},
  {
    path: 'tasks',
    loadChildren: () => import("./tasks/tasks.module").then(m => m.TasksModule),
    data: {title: 'Tasks'}
  },
  {
    path: 'tickets',
    loadChildren: () => import("./tickets/tickets.module").then(m => m.TicketsModule),
    data: {title: 'Tickets'}
  },{
    path: 'offline-deposit',
    loadChildren: () => import("./offline-deposit/offline-deposit.module").then(m => m.OfflineDepositModule),
    data: {title: 'واریزی آفلاین'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule {
}
