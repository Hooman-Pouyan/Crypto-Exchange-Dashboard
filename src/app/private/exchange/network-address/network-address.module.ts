import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkAddressRoutingModule } from './network-address-routing.module';
import { NetworkAddressContainerComponent } from './network-address-container/network-address-container.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    NetworkAddressContainerComponent
  ],
  imports: [
    CommonModule,
    NetworkAddressRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    TranslateModule
  ]
})
export class NetworkAddressModule { }
