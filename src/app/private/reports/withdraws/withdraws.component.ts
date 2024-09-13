import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ReportService} from 'src/app/core/Services/Feature Services/report.service';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawsComponent extends BaseTable {

  constructor(private reportservice: ReportService) {
    super(
      [
        {field: 'full_name', pipe: '',},
        {field: 'date_time', pipe: '',},
        {field: 'total_amount', pipe: 'exchange',},
        {field: 'type', pipe: '',},
        {field: 'status', pipe: 'status',}
      ],
      reportservice,
      Api_Endpoints.report.withdraws
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
