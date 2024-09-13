import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect} from '@angular/core';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ReportService} from 'src/app/core/Services/Feature Services/report.service';
import {ActionService} from "../../../../core/Services/Shared Services/action.service";

@Component({
  selector: 'app-pair-currencies',
  templateUrl: './pair-currencies.component.html',
  styleUrls: ['./pair-currencies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PairCurrenciesComponent extends BaseTable {

  constructor(private reportservice: ReportService,private actionService:ActionService,private cdr:ChangeDetectorRef) {
    super(
      [
        {field: 'exchangeType', pipe: 'exchange'},
        {field: 'market', pipe: 'toggle',path: Api_Endpoints.currency_pairs.patch},
        {field: 'is_margin_trading_allowed', pipe: 'toggle',path: Api_Endpoints.currency_pairs.patch},
        {field: 'is_spot_trading_allowed', pipe: 'toggle',path: Api_Endpoints.currency_pairs.patch},
        {field: 'status', pipe: 'toggle',path: Api_Endpoints.currency_pairs.patch},
        // {field: 'operation', pipe: 'delete', path:Api_Endpoints.currency_pairs.crud.delete},
        {field: 'operation', pipe: 'edit'},
      ],
      reportservice,
      Api_Endpoints.currency_pairs.crud.list
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

  //listen to signal delete signal for refresh data
  onSync = effect(() => {
    if (this.actionService._refreshData() != null) {
      this.fetchData()
      this.cdr.detectChanges()
    }
  }, {allowSignalWrites: true})
}
