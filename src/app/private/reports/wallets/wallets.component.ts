import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ExchangeService} from "../../../core/Services/Feature Services/exchange.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletsComponent implements OnInit {
  wallets = signal<any[]>([])
  filteredWallets = signal<any[]>([])
  cdnUrl = environment.cdnUrl
  loadData=signal(false)

  constructor(private exchangeService: ExchangeService) {
  }

  ngOnInit() {
    this.exchangeService.fetchAll(Api_Endpoints.report.hot_wallets, {}).subscribe(
      (response) => {
        this.wallets.set(response.data)
        this.filteredWallets.set(response.data)
        this.loadData.set(true)
      }
    )
  }

  filterResult($event: any) {
    this.filteredWallets.set($event)
  }
}
