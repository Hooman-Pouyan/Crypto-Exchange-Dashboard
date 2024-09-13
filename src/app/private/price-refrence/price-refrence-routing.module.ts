import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceReferenceContainerComponent } from './price-reference-container/price-reference-container.component';
import { CurrenciesComponent } from '../exchange/currencies/currencies-container/currencies.component';
import { CurrencyPricesComponent } from './currency-prices/currency-prices.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {path: "", component: PriceReferenceContainerComponent, children: [
    {path: ":reference/edit", component: CurrencyPricesComponent}
  ] },
  { path: "settings", component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRefrenceRoutingModule { }
