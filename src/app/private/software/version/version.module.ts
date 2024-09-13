import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VersionRoutingModule } from './version-routing.module';
import { VersionContainerComponent } from './version-container/version-container.component';
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../../shared/modules/Material Modules/material.modules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddComponent } from './add/add.component';
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {SoftwareModule} from "../software.module";


@NgModule({
  declarations: [
    VersionContainerComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    VersionRoutingModule,
    MatCardModule,
    TranslateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SkeletonModule,
    SoftwareModule
  ]
})
export class VersionModule { }
