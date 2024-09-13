import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
@NgModule({
  declarations: [

    ContainerComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class SettingsModule { }
