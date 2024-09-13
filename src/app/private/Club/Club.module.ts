import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { clubRoutingModule } from './club-routing.module';
import { clubContainerComponent } from './club-container/club-container.component';
import { AggridBaseModule } from 'src/app/shared/modules/aggrid-base/aggrid-base.module';
import { FilterComponent } from './filter/filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { clubDetailComponent } from './level-detail/club-detail-Container/club-detail.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { AddComponent } from './level-detail/club-commission/add/add.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClubCommissionComponent } from './level-detail/club-commission/list/club-commission/club-commission.component';
import { ClubFormComponent } from './level-detail/club-detail-Container/club-form/club-form.component';

@NgModule({
  declarations: [
    clubContainerComponent,
    FilterComponent,
    clubDetailComponent,
    AddComponent,
    ClubCommissionComponent,
    ClubFormComponent,
  ],
  imports: [
    CommonModule,
    clubRoutingModule,
    SharedModule,
    AgGridModule,
    AggridBaseModule,
    SkeletonModule,
    TabMenuModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CascadeSelectModule,
    DropdownModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class clubModule { }
