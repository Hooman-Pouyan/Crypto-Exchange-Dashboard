import {ChangeDetectionStrategy, Component, OnInit, computed, signal} from '@angular/core';
import {Observable, map, tap} from 'rxjs';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {IExchange} from 'src/app/core/Models/IReports';
import {ReportService} from 'src/app/core/Services/Feature Services/report.service';


@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangesComponent extends BaseTable {

  constructor(private reportservice: ReportService) {
    super(
      [
        {field:'exchangeType',pipe:'exchange'},
        {field:'full_name',pipe:''},
        {field:'date_time',pipe:''},
        {field:'base_price',pipe:''},
        {field:'type',pipe:''},
        {field:'total_amount',pipe:''},
        {field:'received_amount',pipe:''},
        {field:'status',pipe:'status'},
        {field:'tracking_code',pipe:''},
      ],
      reportservice,
      Api_Endpoints.report.exchange
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
