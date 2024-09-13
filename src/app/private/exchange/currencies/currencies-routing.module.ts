import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './currencies-container/currencies.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: CurrenciesComponent},
  {path: ':id/edit', component: EditComponent,data:{title:'edit'}},
  {path: 'add', component: EditComponent,data:{title:'add'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
