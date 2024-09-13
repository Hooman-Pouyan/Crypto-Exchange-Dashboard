import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsContainerComponent } from './reports-container/reports-container.component';
import { ExchangesComponent } from './exchanges/exchanges.component';
import { PairCurrenciesComponent } from './pair-currencies/pair-currencies.component';
import { DepositsComponent } from './deposits/deposits.component';
import { WithdrawsComponent } from './withdraws/withdraws.component';
import { WalletsComponent } from './wallets/wallets.component';
import {AddressesComponent} from "./addresses/addresses.component";

const routes: Routes = [
  { path: "", component:ReportsContainerComponent, children: [
    {path: '', redirectTo: "exchanges", pathMatch: "full"},
    {path: "exchanges", component: ExchangesComponent,data:{title:'exchanges'}},
    {path: "currency_pairs", component: PairCurrenciesComponent,data:{title: 'currency pairs'}},
    {path: "deposits", component: DepositsComponent,data:{title: 'deposits'}},
    {path: "withdraws", component: WithdrawsComponent,data:{title: 'withdrawals'}},
    {path: "wallets", component: WalletsComponent,data:{title: 'wallets'}},
    {path: "addresses", component: AddressesComponent,data:{title: 'addresses'}, children: [
    {path: ":page", component: AddressesComponent,data:{title: 'address.title'}},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
