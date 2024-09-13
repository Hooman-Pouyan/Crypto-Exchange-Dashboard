import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksContainerComponent } from './tasks-container/tasks-container.component';
import {SplitterModule} from "primeng/splitter";
import { TabViewModule } from 'primeng/tabview';
import {MatDividerModule} from '@angular/material/divider';
import { DividerModule } from 'primeng/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StatusPipe } from 'src/app/shared/Pipes/status.pipe';
import { PaginationModule } from 'src/app/shared/modules/aggrid-base/pagination/pagination.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        TasksContainerComponent,
        EditComponent,
        ListComponent,
        StatusPipe,
    ],
    exports: [
        ListComponent
    ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        SplitterModule,
        DividerModule,
        MatTabsModule,
        SharedModule,
        ScrollPanelModule,
        MatCardModule,
        MatRippleModule,
        MatProgressBarModule,
        ProgressSpinnerModule,
        PaginationModule,
        TranslateModule
    ]
})
export class TasksModule { }
