import {Component, effect, signal} from '@angular/core';
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {BaseTable} from "../../../../core/Classes/Base_Table";
import {EditComponent} from "../edit/edit.component";
import {DialogService} from "../../../../core/Services/Shared Services/dialog.service";
import {SupportService} from "../../../../core/Services/Feature Services/support.service";

@Component({
  selector: 'app-offline-deposit',
  templateUrl: './offline-deposit.component.html',
  styleUrls: ['./offline-deposit.component.scss']
})
export class OfflineDepositComponent extends BaseTable {
  _refreshRows = signal<any>(false)

  constructor(
    private dialogService: DialogService,
    private supportService: SupportService
  ) {
    super(
      [
        {field: 'tracking_code'},
        {field: 'amount', pipe: ''},
        {field: 'date', pipe: ''},
        {field: 'reason', pipe: ''},
        {field: 'currency', pipe: 'exchange'},
        {field: 'status', pipe: 'status'},
        {field: 'edit', pipe: 'edit', dialog: true}
      ],
      supportService,
      Api_Endpoints.support.offlineDeposit.list
    )
  }


  // refreshData(queryParams: any) {
  //   Object.keys(queryParams).forEach(item => {
  //     if (queryParams[item] === null)
  //       delete queryParams[item]
  //   })
  //   this.queryParams.set(queryParams)
  //   this.fetchData()
  // }

  override cellClicked(row: any) {
    if (row.colDef.field === 'edit') {
      this.openEditDialog(
        {
          data: row.data
        }
      )
    }
  }

  openEditDialog(data: any) {
    this.dialogService.openDialog(data, EditComponent)
  }

  onSync = effect(() => {
    if (this.dialogService.response() != null) {
      // this.refreshData({})
      // this.cdr.detectChanges()
    }
  }, {allowSignalWrites: true})

}
