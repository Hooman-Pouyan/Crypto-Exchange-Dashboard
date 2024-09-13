import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeesComponent} from "./fees/fees.component";
import {AggridBaseModule} from "../../../../shared/modules/aggrid-base/aggrid-base.module";
import {FeeFormComponent} from "./fee-form/fee-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    FeesComponent,
    FeeFormComponent
  ],
  exports: [
    FeesComponent
  ],
  imports: [
    CommonModule,
    AggridBaseModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule,
    MatDialogModule
  ]
})
export class FeesModule {
}
