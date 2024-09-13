import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrencyFilterComponent} from './currency-filter/currency-filter.component';
import {DepositFilterComponent} from './deposit-filter/deposit-filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../../shared/modules/Material Modules/material.modules";


@NgModule({
  declarations: [
    CurrencyFilterComponent,
    DepositFilterComponent
  ],
  exports: [
    CurrencyFilterComponent,
    DepositFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    TranslateModule,
    MaterialModule
  ]
})
export class FilterModule {
}
