import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersContainerComponent } from './users-container/users-container.component';

//  it's for test now, i should make it a module and reusable
import { HttpClientModule } from '@angular/common/http';
import {SharedModule} from "../../shared/shared.module";
import { AgGridModule } from 'ag-grid-angular';
// import { PaginationModule } from 'src/app/shared/Modules/aggrid-base/pagination/pagination.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AggridBaseModule } from 'src/app/shared/modules/aggrid-base/aggrid-base.module';
import { SkeletonModule } from 'primeng/skeleton';
import { TabMenuModule } from 'primeng/tabmenu';
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import { UserCommissionComponent } from './user-detail/user-commission/list/user-commission.component';
import { AddComponent } from './user-detail/user-commission/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import {MatDialogModule} from '@angular/material/dialog';
import { FilterComponent } from './Components/filter/filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserWalletComponent } from './user-detail/user-wallet/user-wallet.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { UserTasksComponent } from './user-detail/user-tasks/user-tasks.component';
import { UserSessionsComponent } from './user-detail/user-sessions/user-sessions.component';
import { StepsModule } from 'primeng/steps';
import { WalletdetailComponent } from './user-detail/user-wallet/walletdetail/walletdetail.component';
import { ListboxModule } from 'primeng/listbox';
import { UserPoanLevelComponent } from './user-detail/user-poan-level/user-poan-level.component';
import { UserResetpasswordComponent } from './user-detail/user-resetpassword/user-resetpassword.component';
import { KnobModule } from 'primeng/knob';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [UsersContainerComponent, UserDetailComponent, UserCommissionComponent, AddComponent, FilterComponent, UserWalletComponent, UserFormComponent, UserTasksComponent, UserSessionsComponent, WalletdetailComponent, UserPoanLevelComponent, UserResetpasswordComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        HttpClientModule,
        SharedModule,
        AgGridModule,
        AggridBaseModule,
        SkeletonModule,
        TabMenuModule,
        ButtonModule,
        ToastModule,
        ReactiveFormsModule,
        FormsModule,
        CascadeSelectModule,
        DropdownModule,
        MatDialogModule,
        TranslateModule,
        StepsModule,
        ListboxModule,
        KnobModule,
        InputTextModule
    ],
})
export class UsersModule {}
