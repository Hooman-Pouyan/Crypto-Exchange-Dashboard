import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

const routes: Routes = [
  {path: "", redirectTo: 'currency', pathMatch: 'full', data: {animation: 'routeAnimations'}},
  {
    path: "currency",
    loadChildren: () => import("./currencies/currencies.module").then(m => m.CurrenciesModule),
    data: {animation: 'routeAnimations', title: 'currencies'}
  },
  {
    path: "currency_pairs",
    loadChildren: () => import("./pair-currencies/currency-pair.module").then(m => m.CurrencyPairModule),
    data: {animation: 'routeAnimations', title: 'currency pairs'}
  },
  {
    path: "network",
    loadChildren: () => import("./networks/network.module").then(m => m.NetworkModule),
    data: {animation: 'routeAnimations', title: 'networks'}
  },{
    path: "networkAddress",
    loadChildren: () => import("./network-address/network-address.module").then(m => m.NetworkAddressModule),
    data: {animation: 'routeAnimations', title: 'networkAddress'}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule {
  constructor(public translate: TranslateService) {
  }
}
