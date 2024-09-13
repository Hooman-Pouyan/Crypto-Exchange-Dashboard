import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NetworksComponent} from "./network-container/networks.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [
  {path: '', component: NetworksComponent},
  {path: 'add', component: FormComponent,data:{title:'add'}},
  {path: ':id/edit', component: FormComponent,data:{title:'edit'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
