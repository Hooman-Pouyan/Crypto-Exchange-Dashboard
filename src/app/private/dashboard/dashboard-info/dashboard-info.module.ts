import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardInfoRoutingModule } from './dashboard-info-routing.module';
import { DashboardInfoContainerComponent } from './dashboard-info-container/dashboard-info-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    DashboardInfoContainerComponent
  ],
  imports: [
    CommonModule,
    DashboardInfoRoutingModule,
    SharedModule,
    SkeletonModule,
    OverlayPanelModule,
    ButtonModule,
    TableModule
  ],exports: [
    DashboardInfoContainerComponent

  ]
})
export class DashboardInfoModule { }
