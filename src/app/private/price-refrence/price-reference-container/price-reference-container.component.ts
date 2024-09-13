import {ChangeDetectionStrategy, Component, effect} from '@angular/core';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {PriceReferenceService} from 'src/app/core/Services/Feature Services/price-reference.service';

@Component({
  selector: 'app-price-reference-container',
  templateUrl: './price-reference-container.component.html',
  styleUrls: ['./price-reference-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceReferenceContainerComponent extends BaseTable {

  constructor(private pricereferenceservice: PriceReferenceService) {
    super(
      [
        {field: 'name', pipe: ''},
        {field: 'unit', pipe: ''},
        {field: 'side', pipe: ''},
        {field: 'selected', pipe: 'toggle', path: Api_Endpoints.pricereference.update_selected},
        {field: 'status', pipe: 'toggle', path: Api_Endpoints.pricereference.update_status},
        {field: 'prices', pipe: 'popup', path: Api_Endpoints.pricereference.currency},
        // {field: 'delete', pipe: 'popup', path: Api_Endpoints.pricereference.currency},
      ],
      pricereferenceservice,
      Api_Endpoints.pricereference.list
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
    console.log(e)
  }

  // onSync = effect(() => {
  //   if (this.pricereferenceservice.refreshPrices()) {
  //     this.fetchData()
  //   }
  // },{allowSignalWrites: true})

}
