import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, concatMap, tap, toArray} from 'rxjs';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ClubService} from 'src/app/core/Services/Feature Services/club.service';
import {ToolbarService} from 'src/app/core/Services/Shared Services/toolbar.service';

@Component({
  selector: 'app-club-commission',
  templateUrl: './club-commission.component.html',
  styleUrls: ['./club-commission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClubCommissionComponent extends BaseTable {

  clubCommissions!: Observable<any>

  @Input() symbol_type: any;
  _refreshRows = signal<any>([]);

  @Input() set refresh(value: boolean) {
    this.getClubCommissions(this.levelId)
  }

  @Input() levelId!: number;

  @Output() editCommission = new EventEmitter<any>

  constructor(
    private activatedroute: ActivatedRoute,
    private clubservice: ClubService,
    private toobarService: ToolbarService,
  ) {
    super(
      [
        {field: 'fee', pipe: ''},
        {field: 'action_type', pipe: ''},
        {field: 'market', pipe: ''},
        {field: 'symbol_type', pipe: ''},
        {field: 'symbol', pipe: ''},
        // {field: 'blocked', pipe: 'toggle', path: Api_Endpoints.club.commission.patch},
        {field: 'delete', pipe: 'delete', path: Api_Endpoints.club.commission.delete},
        {field: 'edit', pipe: 'edit'},

      ],
      clubservice,
      Api_Endpoints.club.commission.show,
    )

  }

  ngOnInit(): void {
    this.getClubCommissions(this.levelId)

  }

  getClubCommissions(levelId: number) {
    this.clubCommissions = this.clubservice.getLevelCommmisions(levelId).pipe(
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
