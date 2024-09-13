import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersContainerComponent} from './users-container/users-container.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import { UserFormComponent } from './Components/user-form/user-form.component';

const routes: Routes = [
  {path: '', component: UsersContainerComponent },
  {
    path: ":id/edit", component: UserDetailComponent, data: {title: 'edit'}, children: [
      {path: "", redirectTo: "info", pathMatch: "full"},
      {path: "info", component: UserDetailComponent, data: {title: 'Basic Information'}},
      {path: "currency", component: UserDetailComponent, data: {title: 'Currency.unit.crypto'}},
      {path: "currency-pair", component: UserDetailComponent, data: {title: 'currency pair.DEFAULT'}},
      {path: "tasks", component: UserDetailComponent, data: {title: 'tasks'}},
      {path: "poanlevel", component: UserDetailComponent, data: {title: 'tasks'}},
      {path: "password", component: UserDetailComponent, data: {title: 'tasks'}},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
