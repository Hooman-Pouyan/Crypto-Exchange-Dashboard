import {Component, signal} from '@angular/core';
import {ToggleService} from 'src/app/core/Services/Shared Services/toggle.service';
import {ToastrMessagesService} from 'src/app/core/Services/Shared Services/toastr-messages.service';
import {PriceReferenceService} from "../../../../../../core/Services/Feature Services/price-reference.service";

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  status!: boolean;
  id = 0;
  columnId = '';
  apiEndpoint = signal<string>('')

  constructor(
    private priceReferenceService:PriceReferenceService,
    private toggleService: ToggleService,
    private toast: ToastrMessagesService
  ) {
  }

  agInit(params?: any): void {
    this.columnId = params?.column?.getColId() ? params?.column?.getColId() : ''
    this.status = params?.data[this.columnId]
    this.id = params?.data.id
    this.apiEndpoint.set(params.path)

  }

  changeStatus() {
    if (this.apiEndpoint()) {
      const toggledStatus: Object = {
        key: this.columnId,
        value: this.status ? "0" : "1"
      }

      const clubStatus = {
        status: !this.status
      }
      this.status = !this.status

      this.toggleService.toggleData(this.id, this.apiEndpoint(), window.location.href.includes("club") ? clubStatus : toggledStatus).pipe().subscribe(
        (response) => {
          // this.priceReferenceService.refreshPrices.set(!this.priceReferenceService.refreshPrices())
          if (response) this.toast.showSuccess("وضعیت با موفقیت آپدیت شد")
        }
      )
    }
  }

  // apiUrl(): string {
  //   const url = window.location.href
  //   const parts = url.split('/');
  //   const lastPart = parts.at(-1)
  //   if (lastPart)
  //     return lastPart
  //   return ''
  // }
}

