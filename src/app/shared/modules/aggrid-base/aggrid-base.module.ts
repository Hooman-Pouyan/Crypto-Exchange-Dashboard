import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggridBaseRoutingModule } from './aggrid-base-routing.module';
import { AggridContainerComponent } from './aggrid-container/aggrid-container.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AgGridModule } from 'ag-grid-angular';
import { PaginationModule } from './pagination/pagination.module';
import {CellRendererModule} from "./Custom Components/Cell-Renderers/cell-renderer.module";


@NgModule({
  declarations: [
    AggridContainerComponent,
  ],
  imports: [
    CommonModule,
    AggridBaseRoutingModule,
    MatSlideToggleModule,
    AgGridModule,
    PaginationModule,
    CellRendererModule
  ],
  exports: [
    AggridContainerComponent,
    PaginationModule

  ]
})
export class AggridBaseModule { }
