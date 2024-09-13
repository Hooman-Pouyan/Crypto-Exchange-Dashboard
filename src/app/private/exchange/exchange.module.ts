import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeContainerComponent } from './exchange-container/exchange-container.component';
import { AggridBaseModule } from 'src/app/shared/modules/aggrid-base/aggrid-base.module';
import {MatExpansionModule} from "@angular/material/expansion";
import {SkeletonModule} from "primeng/skeleton";
import {StyleClassModule} from "primeng/styleclass";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    ExchangeContainerComponent,
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    AggridBaseModule,
    MatExpansionModule,
    SkeletonModule,
    StyleClassModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ExhchangeModule { }
