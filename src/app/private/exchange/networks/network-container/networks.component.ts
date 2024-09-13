import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnInit, signal} from '@angular/core';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";
import {BaseTable} from "../../../../core/Classes/Base_Table";
import {ActionService} from "../../../../core/Services/Shared Services/action.service";

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworksComponent extends BaseTable {
  networks: any
  netKeys = signal<any[]>([])
  qparams: object = {}

  constructor(private exchangeService: ExchangeService, private actionService: ActionService, private cdr: ChangeDetectorRef) {
    super(
      [
        {field: 'exchangeType', pipe: 'exchange'},
        {field: 'deposit_enable', pipe: 'toggle', path: Api_Endpoints.network.patch},
        {field: 'depositRange', pipe: ''},
        {field: 'withdraw_enable', pipe: 'toggle', path: Api_Endpoints.network.patch},
        {field: 'withdrawRange', pipe: ''},
        {field: 'status', pipe: 'toggle', path: Api_Endpoints.network.patch},
        // {field: 'operation', pipe: 'delete', path: Api_Endpoints.network.crud.delete},
        {field: 'operation', pipe: 'edit'},
      ],
      exchangeService,
      Api_Endpoints.network.crud.list
    )
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.netKeys.set([])
    this.fetchData()
    this.exchangeService.fetchAll(Api_Endpoints.network.list, this.qparams).subscribe(
      (response) => {
        this.networks = response
        this.netKeys.set([])
        Object.keys(this.networks).forEach(net => {
          const item = {name: net, status: false}
          this.netKeys.set([...this.netKeys(), item])
        })
      }
    )
  }

  refreshData(queryParams: any) {
    Object.keys(queryParams).forEach(item => {
      if (queryParams[item] === null)
        delete queryParams[item]
    })
    delete queryParams.status
    this.qparams = queryParams
    this.getData()
  }

  //listen to signal delete signal for refresh data
  onSync = effect(() => {
    if (this.actionService._refreshData() != null) {
      this.getData()
      this.cdr.detectChanges()
    }
  }, {allowSignalWrites: true})

  changeNetworkStatus($event: string) {
    const index = this.netKeys().findIndex(item => item.name === $event)
    this.netKeys()[index].status = true
  }
}
