import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkRoutingModule } from './network-routing.module';
import {AggridBaseModule} from "../../../shared/modules/aggrid-base/aggrid-base.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../shared/modules/Material Modules/material.modules";
import {NetworksComponent} from "./network-container/networks.component";
import { FormComponent } from './form/form.component';
import {SkeletonModule} from "primeng/skeleton";
import { FilterComponent } from './filter/filter.component';
import {NetworkDirective} from "../../../shared/Directives/network.directive";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    NetworksComponent,
    FormComponent,
    FilterComponent,
    NetworkDirective
  ],
    imports: [
        CommonModule,
        NetworkRoutingModule,
        AggridBaseModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        SkeletonModule,
        TranslateModule,
    ],
  exports:[
    NetworkDirective
  ]
})
export class NetworkModule { }
