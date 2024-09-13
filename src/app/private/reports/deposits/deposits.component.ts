import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {IDeposit} from 'src/app/core/Models/IReports';
import {ReportService} from 'src/app/core/Services/Feature Services/report.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositsComponent extends BaseTable {

  constructor(private reportservice: ReportService, public router:Router) {
    super(
      [
        {field: 'full_name', pipe: ''},
        {field: 'date_time', pipe: ''},
        {field: 'type', pipe: ''},
        {field: 'total_amount', pipe: 'exchange'},
        {field: 'status', pipe: 'status'},
      ],
      reportservice,
      Api_Endpoints.report.deposits,
      router
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

// override pageChange(e: any){
//   const url = window.location.href.includes("?") ? window.location.href.indexOf("?") : -1
//   this.router.navigate([window.location.href.slice(22, url)], {queryParams:{page: e.pageIndex}})

//   console.log("adad", e.pageIndex)
// }


}
