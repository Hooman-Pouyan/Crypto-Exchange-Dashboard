import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbContainerComponent } from './breadcrumb-container/breadcrumb-container.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "../Material Modules/material.modules";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    BreadcrumbContainerComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MatIconModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    BreadcrumbContainerComponent,
    BreadcrumbModule
  ]
})
export class BreadCrumbModule { }
