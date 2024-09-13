import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsContainerComponent} from "./tickets-container/tickets-container.component";
import { ReplyComponent } from './reply/reply.component';

const routes: Routes = [
  {
    path: '', component: TicketsContainerComponent, children: [
      {path: ':id/reply', component: ReplyComponent, data: {title: 'پاسخ تیکت'}},
      // {path: 'My', component: ListComponent, data: {title: 'archive'}},
      // {path: 'closed', component: EditComponent, data: {title: 'details'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
