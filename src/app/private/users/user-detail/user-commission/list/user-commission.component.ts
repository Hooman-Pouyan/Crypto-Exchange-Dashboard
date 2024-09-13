import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, effect, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, concatMap, filter, map, tap, toArray} from 'rxjs';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ToolbarService} from 'src/app/core/Services/Shared Services/toolbar.service';
import {UserService} from 'src/app/core/Services/Feature Services/user.service';
import {DialogService} from 'src/app/core/Services/Shared Services/dialog.service';

@Component({
  selector: 'app-user-commission',
  templateUrl: './user-commission.component.html',
  styleUrls: ['./user-commission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCommissionComponent extends BaseTable implements OnInit {

  userCommissions!: Observable<any>

  @Input() symbol_type: any;
  @Output() editCommission = new EventEmitter<any>

  @Input() set refresh(value: boolean) {
    this.getUserCommision()
  }

  @Input() userId!: number;

  _refreshRows = signal<any>([])

  constructor(
    private activatedroute: ActivatedRoute,
    private userservice: UserService,
    private toobarService: ToolbarService,
    private dialogService: DialogService
  ) {
    super(
      [
        {field: 'fee', pipe: ''},
        {field: 'action_type', pipe: ''},
        {field: 'market', pipe: ''},
        {field: 'symbol_type', pipe: ''},
        {field: 'symbol', pipe: ''},
        // {field: 'blocked', pipe: 'toggle', path: Api_Endpoints.user.commission.patch},
        {field: 'delete', pipe: 'delete', path: Api_Endpoints.user.commission.delete},
        {field: 'edit', pipe: 'edit'},
      ],
      userservice,
      Api_Endpoints.user.commission.show,
    )
  }

  ngOnInit(): void {
    this.getUserCommision()

  }

  getUserCommision() {
    this.userCommissions = this.userservice.getUserCommmisions(this.userId).pipe(
      concatMap((commissions) =>
        commissions.data.filter((res: any) => {
          if (res.symbol_type == this.symbol_type) return res
        }),
      ),
      toArray(),
      tap((res) => console.log(res)))
  }

  override cellClicked(e: any) {
    if (e.colDef.headerName == "ویرایش") this.editCommission.emit(e)
  }


}
