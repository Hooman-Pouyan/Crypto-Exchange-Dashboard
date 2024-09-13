import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, signal} from '@angular/core';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ExchangeService} from 'src/app/core/Services/Feature Services/exchange.service';
import {ActionService} from "../../../../core/Services/Shared Services/action.service";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrenciesComponent extends BaseTable {
  _refreshRows = signal<any>(false)

  constructor(private exchangeService: ExchangeService, private actionService: ActionService,private cdr:ChangeDetectorRef) {
    super(
      [
        {field: 'name', pipe: 'exchange'},
        {field: 'symbol', pipe: ''},
        {field: 'unit', pipe: ''},
        {field: 'status', pipe: 'toggle', path: Api_Endpoints.currency.patch},
        {field: 'exchange_sell_price', pipe: ''},
        {field: 'exchange_buy_price', pipe: ''},
        // {field: 'operation', pipe: 'action',actions: ['delete', 'edit'], path:[Api_Endpoints.currency.crud.delete]},
        // {field: '', pipe: 'delete', path: Api_Endpoints.currency.crud.delete},
        {field: '', pipe: 'edit'},
      ],
      exchangeService,
      Api_Endpoints.currency.crud.list
    )
  }


  refreshData(queryParams: any) {
    Object.keys(queryParams).forEach(item => {
      if (queryParams[item] === null)
        delete queryParams[item]
    })
    this.queryParams.set(queryParams)
    this.fetchData()
  }

  override cellClicked(e: any) {
    // console.log(this.refreshRows());
    // this._refreshRows.set(this.refreshRows())
  }

  //listen to signal delete signal for refresh data
  // onSync = effect(() => {
  //   if (this.actionService._refreshData() != null) {
  //     this.fetchData()
  //     this.cdr.detectChanges()
  //   }
  // }, {allowSignalWrites: true})

}
