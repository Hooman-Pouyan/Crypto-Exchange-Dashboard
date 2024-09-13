import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportsRoutingModule} from './reports-routing.module';
import {ReportsContainerComponent} from './reports-container/reports-container.component';
import {ExchangesComponent} from './exchanges/exchanges.component';
import {AggridBaseModule} from 'src/app/shared/modules/aggrid-base/aggrid-base.module';
import {PairCurrenciesComponent} from './pair-currencies/pair-currencies.component';
import {WithdrawsComponent} from './withdraws/withdraws.component';
import {DepositsComponent} from './deposits/deposits.component';
import {WalletsComponent} from './wallets/wallets.component';
import {AddressesComponent} from './addresses/addresses.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SkeletonModule} from "primeng/skeleton";
import {FilterModule} from "./filter/filter.module";
import { FilterComponent } from './wallets/filter/filter.component';
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    declarations: [
        ReportsContainerComponent,
        ExchangesComponent,
        PairCurrenciesComponent,
        WithdrawsComponent,
        DepositsComponent,
        WalletsComponent,
        AddressesComponent,
        FilterComponent
    ],
    exports: [
        AddressesComponent
    ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    AggridBaseModule,
    MatCardModule,
    MatProgressBarModule,
    SkeletonModule,
    FilterModule,
    MatInputModule,
    TranslateModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,

  ]
})
export class ReportsModule {
}
