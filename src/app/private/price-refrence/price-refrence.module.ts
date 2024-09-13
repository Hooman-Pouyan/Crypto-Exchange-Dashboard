import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRefrenceRoutingModule } from './price-refrence-routing.module';
import { PriceReferenceContainerComponent } from './price-reference-container/price-reference-container.component';
import { CurrencyPricesComponent } from './currency-prices/currency-prices.component';
import { AggridBaseModule } from 'src/app/shared/modules/aggrid-base/aggrid-base.module';
import { MaterialModule } from 'src/app/shared/modules/Material Modules/material.modules';
import { CurrencyFilterComponent } from './components/currency-filter/currency-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReferenceFormComponent } from './components/reference-form/reference-form.component';
@NgModule({
  declarations: [
    PriceReferenceContainerComponent,
    CurrencyPricesComponent,
    CurrencyFilterComponent,
    SettingsComponent,
    ReferenceFormComponent,
  ],
  imports: [
    CommonModule,
    PriceRefrenceRoutingModule,
    AggridBaseModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    InputSwitchModule,
    InputNumberModule

  ]
})
export class PriceRefrenceModule { }
