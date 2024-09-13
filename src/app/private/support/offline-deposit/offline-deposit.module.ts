import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineDepositRoutingModule } from './offline-deposit-routing.module';
import { OfflineDepositComponent } from './offline-deposit/offline-deposit.component';
import {AggridBaseModule} from "../../../shared/modules/aggrid-base/aggrid-base.module";
import { EditComponent } from './edit/edit.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {SkeletonModule} from "primeng/skeleton";


@NgModule({
  declarations: [
    OfflineDepositComponent,
    EditComponent
  ],
    imports: [
        CommonModule,
        OfflineDepositRoutingModule,
        AggridBaseModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonToggleModule,
        FormsModule,
        SkeletonModule
    ]
})
export class OfflineDepositModule { }
