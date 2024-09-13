import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationsRoutingModule } from './translations-routing.module';
import { TranslateContainerComponent } from './translate-container/translate-container.component';
import {AggridBaseModule} from "../../../shared/modules/aggrid-base/aggrid-base.module";
import {MaterialModule} from "../../../shared/modules/Material Modules/material.modules";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SoftwareModule} from "../software.module";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    TranslateContainerComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    TranslationsRoutingModule,
    AggridBaseModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    SoftwareModule,
    ConfirmPopupModule,
    ToastModule,
    ReactiveFormsModule
  ]
})
export class TranslationsModule { }
