import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PairCurrenciesComponent} from "./currency-pair-container/pair-currencies.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [
  {path: '', component: PairCurrenciesComponent},
  {path: 'add', component: FormComponent,data:{title:'add'}},
  {path: ':id/edit', component: FormComponent,data:{title:'edit'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyPairRoutingModule {
}
