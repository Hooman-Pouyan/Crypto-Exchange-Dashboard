import {ChangeDetectionStrategy, Component, ViewChild, signal, OnInit, computed, effect} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AgGridAngular} from 'ag-grid-angular';
import {CellClickedEvent, ColDef, GridOptions, GridReadyEvent} from 'ag-grid-community';
import {BehaviorSubject, Observable, map, tap} from 'rxjs';
import { BaseTable } from 'src/app/core/Classes/Base_Table';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import {IUser} from 'src/app/core/Models/IUser';
import {UserService} from 'src/app/core/Services/Feature Services/user.service';
import { DialogService } from 'src/app/core/Services/Shared Services/dialog.service';
import {
  LoadingComponent
} from 'src/app/shared/modules/aggrid-base/Custom Components/Cell-Renderers/loading/loading.component';
import { UserFormComponent } from '../Components/user-form/user-form.component';
import { ToolbarService } from 'src/app/core/Services/Shared Services/toolbar.service';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  providers: [TranslateService]
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent extends BaseTable {

  loading = signal<boolean>(false)
  _refreshRows = signal<any>(false)

  usersData!: Observable<any>;

  constructor(
    private userservice: UserService,
    private dialogservice:DialogService) {
      super(
        [
          {field: 'firstname', pipe: '',path:''},
          {field: 'lastname', pipe: '',path:''},
          {field: 'email', pipe: '',path:''},
          {field: 'mobile', pipe: '',path:''},
          {field: 'mobile_prefix', pipe: '',path:''},
          {field: 'verify_at', pipe: '',path:''},
          {field: 'identity_status', pipe: 'status',path:''},
          {field: 'blocked_at', pipe: 'status',path:''},
          {field: 'operation', pipe: 'edit'},
        ],
        userservice,
        Api_Endpoints.user.list
      )
  }


  refreshData(queryParams: any) {
    Object.keys(queryParams).forEach(item => {
      if (queryParams[item]===null)
        delete queryParams[item]
    })
    this.queryParams.set(queryParams)
    this.fetchData()
  }

  // onSync = effect(() => console.log(this.toolbarservice.actions.sync()))


  newUser(){
    this.dialogservice.openDialog(
      {
        data: {
          user_id: '',
          mobile_prefix: '',
          mobile: '',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          role_id: '',
        }
      }
      , UserFormComponent)
  }




}
