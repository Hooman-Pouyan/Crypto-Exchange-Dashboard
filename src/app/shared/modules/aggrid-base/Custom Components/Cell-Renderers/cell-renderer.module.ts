import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ActionsComponent } from './actions/actions-container/actions.component';
import { StatusComponent } from './status/status.component';
import { ExchangeCDNComponent } from './exchange-cdn/exchange-cdn.component';
import {MatIconModule} from "@angular/material/icon";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import { ToggleComponent } from './toggle/toggle.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {MatRippleModule} from "@angular/material/core";
import {RippleModule} from "primeng/ripple";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import {StyleClassModule} from "primeng/styleclass";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EditComponent } from './actions/edit/edit.component';
import { DeleteComponent } from './actions/delete/delete.component';
import { DetailComponent } from './actions/detail/detail.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import { PopupComponent } from './actions/detail/popup/popup.component';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import {SkeletonModule} from "primeng/skeleton";
import {MatInputModule} from "@angular/material/input";
@NgModule({
    declarations: [
        LoadingComponent,
        ActionsComponent,
        StatusComponent,
        ExchangeCDNComponent,
        ToggleComponent,
        EditComponent,
        DeleteComponent,
        DetailComponent,
        PopupComponent

    ],
  imports: [
    CommonModule,
    MatIconModule,
    ButtonModule,
    RouterLink,
    ToggleButtonModule,
    MatSlideToggleModule,
    NgxUiLoaderModule,
    MatRippleModule,
    RippleModule,
    MatButtonModule,
    ConfirmPopupModule,
    ToastModule,
    StyleClassModule,
    ProgressSpinnerModule,
    TranslateModule,
    MatTooltipModule,
    ListboxModule,
    FormsModule,
    MatDialogModule,
    SkeletonModule,
    MatInputModule

  ],
    exports: [
        LoadingComponent
    ]
})
export class CellRendererModule { }
