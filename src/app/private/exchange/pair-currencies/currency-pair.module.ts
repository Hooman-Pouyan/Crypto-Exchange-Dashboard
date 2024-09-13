import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CurrencyPairRoutingModule} from './currency-pair-routing.module';
import {PairCurrenciesComponent} from "./currency-pair-container/pair-currencies.component";
import {AggridBaseModule} from "../../../shared/modules/aggrid-base/aggrid-base.module";
import {FormComponent} from './form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../shared/modules/Material Modules/material.modules";
import { FilterComponent } from './filter/filter.component';
import {TranslateModule} from "@ngx-translate/core";
import {TabMenuModule} from "primeng/tabmenu";
import {CurrenciesModule} from "../currencies/currencies.module";
import {FeesModule} from "../components/fees/fees.module";


@NgModule({
  declarations: [
    PairCurrenciesComponent,
    FormComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    CurrencyPairRoutingModule,
    AggridBaseModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    TranslateModule,
    TabMenuModule,
    CurrenciesModule,
    FeesModule,
  ]
})
export class CurrencyPairModule {
}
