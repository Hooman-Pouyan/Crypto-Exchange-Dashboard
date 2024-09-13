import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BaseTable } from 'src/app/core/Classes/Base_Table';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { SupportService } from 'src/app/core/Services/Feature Services/support.service';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import { ToolbarService } from 'src/app/core/Services/Shared Services/toolbar.service';

@Component({
  selector: 'app-user-sessions',
  templateUrl: './user-sessions.component.html',
  styleUrls: ['./user-sessions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class UserSessionsComponent extends BaseTable {

  userSessions$!:Observable<any>;

  @Input() symbol_type: any;
  @Output() editCommission = new EventEmitter<any>

  @Input() set refresh(value: boolean) {
    this.getUserSessions()
  }

  @Input() userId!: number;

  _refreshRows = signal<any>([])

  constructor(
    private activatedroute: ActivatedRoute,
    private userservice: UserService,
    private toobarService: ToolbarService,
    private dialogService: DialogService,
    private supportService: SupportService,
    private router: Router,
  ) {
    super(
      [
        {field: 'session_id', pipe: ''},
        {field: 'browser', pipe: ''},
        {field: 'os', pipe: ''},
        {field: 'device_brand', pipe: ''},
        {field: 'device_model', pipe: ''},
        {field: 'last_activity', pipe: ''},
        {field: 'ip', pipe: ''},
        {field: 'online_status', pipe: ''},
        {field: 'current', pipe: ''},
        {field: 'delete', pipe: 'delete', path: Api_Endpoints.user.terminateSession},
      ],
      supportService,
      Api_Endpoints.support.task.list,
    )
  }

  ngOnInit(): void {
    this.getUserSessions()
  }

  getUserSessions(){
    this.userSessions$ = this.userservice.getUserSessions(this.userId)
  }

  override cellClicked(e: any) {
    if (e.colDef.headerName == "جزئیات") this.router.navigate([`/Dashboard/support/tasks/${e.data.id}`]);
  }


}
