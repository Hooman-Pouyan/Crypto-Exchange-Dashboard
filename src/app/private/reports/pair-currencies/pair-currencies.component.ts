import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {IPair} from 'src/app/core/Models/IReports';
import {ReportService} from 'src/app/core/Services/Feature Services/report.service';

@Component({
  selector: 'app-pair-currencies',
  templateUrl: './pair-currencies.component.html',
  styleUrls: ['./pair-currencies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PairCurrenciesComponent extends BaseTable {

  constructor(private reportservice: ReportService) {
    super(
      [
        {field: 'full_name', pipe: ''},
        {field: 'exchangeType', pipe: 'exchange'},
        {field: 'received_amount', pipe: ''},
        {field: 'fee', pipe: ''},
        {field: 'base_price', pipe: ''},
        {field: 'exchange_price', pipe: ''},
        {field: 'date_time', pipe: ''},
        {field: 'status', pipe: 'status'},
      ],
      reportservice,
      Api_Endpoints.report.pair_exchange
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

}
