import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CurrenciesRoutingModule} from './currencies-routing.module';
import {AggridBaseModule} from 'src/app/shared/modules/aggrid-base/aggrid-base.module';
import {CurrenciesComponent} from './currencies-container/currencies.component';
import {MaterialModule} from 'src/app/shared/modules/Material Modules/material.modules';
import {EditComponent} from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {FilterComponent} from './filter/filter.component';
import {TabMenuModule} from "primeng/tabmenu";
import { AddressFormComponent } from './edit/address-form/address-form.component';
import {TranslateModule} from "@ngx-translate/core";
import { AddressesComponent } from './edit/addresses/addresses.component';
import {FeesModule} from "../components/fees/fees.module";

@NgModule({
  declarations: [
    CurrenciesComponent,
    EditComponent,
    FilterComponent,
    AddressFormComponent,
    AddressesComponent,
  ],
  exports: [
    FilterComponent,
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    AggridBaseModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    InputTextModule,
    TabMenuModule,
    TranslateModule,
    FeesModule
  ]
})
export class CurrenciesModule {
}
