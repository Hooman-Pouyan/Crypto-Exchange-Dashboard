import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareContainerComponent } from './software-container/software-container.component';
import { AppsListComponent } from './apps-list/apps-list.component';
import {MaterialModule} from "../../shared/modules/Material Modules/material.modules";
import {TranslateModule} from "@ngx-translate/core";
import {SkeletonModule} from "primeng/skeleton";
import { LoadingComponent } from './loading/loading.component';
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import { TreeLoadingComponent } from './tree-loading/tree-loading.component';


@NgModule({
  declarations: [
    SoftwareContainerComponent,
    AppsListComponent,
    LoadingComponent,
    TreeLoadingComponent
  ],
    exports: [
        LoadingComponent,
        TreeLoadingComponent
    ],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    MaterialModule,
    TranslateModule,
    SkeletonModule,
    SharedModule,
    TableModule
  ]
})
export class SoftwareModule { }
