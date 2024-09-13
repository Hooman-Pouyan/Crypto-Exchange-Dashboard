import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsContainerComponent } from './tickets-container/tickets-container.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { ReplyComponent } from './reply/reply.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {SkeletonModule} from "primeng/skeleton";
import {PaginationModule} from "../../../shared/modules/aggrid-base/pagination/pagination.module";

@NgModule({
  declarations: [
    TicketsContainerComponent,
    ReplyComponent,
  ],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        SplitterModule,
        DividerModule,
        MatTabsModule,
        SharedModule,
        ScrollPanelModule,
        MatCardModule,
        MatRippleModule,
        MatProgressBarModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        SkeletonModule,
        NgOptimizedImage,
        PaginationModule
    ]
})
export class TicketsModule { }
