import {Component} from '@angular/core';
import {ICellRendererParams} from "ag-grid-community";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-exchange-cdn',
  templateUrl: './exchange-cdn.component.html',
  styleUrls: ['./exchange-cdn.component.scss']
})
export class ExchangeCDNComponent {
  cdnUrl = environment.cdnUrl
  sourceCoin = '';
  originCoin = '';
  coinName = '';
  pathName = '';
  depositTooltip='';

  constructor() {
    this.pathName = window.location.pathname
  }

  agInit(params: ICellRendererParams<any, number>): void {
    if(this.pathName==='/Dashboard/reports/deposits' || this.pathName==='/Dashboard/reports/withdraws'){
      this.sourceCoin = params.data.currency.toLowerCase()
      this.coinName = (+params.data.total_amount).toLocaleString();
      this.depositTooltip=params.data.currency.toLowerCase()
    }else{
      if (params.data.symbol) {
        this.sourceCoin = params.data.symbol.toLowerCase()
        this.coinName = params.data.name
      } else if (params.data.base_asset) {
        this.sourceCoin = params.data.base_asset.toLowerCase()
        this.originCoin = params.data.quote_asset.toLowerCase()
      } else if (params.data.destin_currency) {
        this.sourceCoin = params.data.currency.toLowerCase()
        this.originCoin = params.data.destin_currency.toLowerCase()
      } else if (params.data.currency) {
        this.sourceCoin = params.data.currency.toLowerCase()
        this.coinName = params.data.currency
      }
    }
  }
}
