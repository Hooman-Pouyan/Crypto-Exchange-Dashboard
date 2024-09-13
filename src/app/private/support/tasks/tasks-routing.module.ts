import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksContainerComponent} from "./tasks-container/tasks-container.component";
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {
    path: '', component: TasksContainerComponent, children: [
      {path: '', component: ListComponent},
      {path: 'archive', component: ListComponent, data: {title: 'archive'}},
      {path: ':id', component: EditComponent, data: {title: 'details'}},
      {path: 'archive/:id', component: EditComponent, data: {title: 'details'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
