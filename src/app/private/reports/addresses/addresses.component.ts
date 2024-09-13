import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {BaseTable} from 'src/app/core/Classes/Base_Table';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {IAddressReport} from 'src/app/core/Models/IReports';
import {ReportService} from 'src/app/core/Services/Feature Services/report.service';
import {environment} from "../../../../environments/environment";
import {ExchangeService} from "../../../core/Services/Feature Services/exchange.service";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesComponent {

  addresses=signal<any[]>([])
  cdnUrl=environment.cdnUrl

  constructor(private exchangeService: ExchangeService) {
  }

  ngOnInit() {
    this.exchangeService.fetchAll(Api_Endpoints.report.address, {}).subscribe(
      (response) => {
        this.addresses.set(response)
      }
    )
  }

}
