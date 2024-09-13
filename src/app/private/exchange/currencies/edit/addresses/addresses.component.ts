import {ChangeDetectorRef, Component, effect, Input, OnInit, signal} from '@angular/core';
import {BaseTable} from "../../../../../core/Classes/Base_Table";
import {Api_Endpoints} from "../../../../../core/Configs/Api_Endpoints";
import {ActivatedRoute, Router} from "@angular/router";
import {ExchangeService} from "../../../../../core/Services/Feature Services/exchange.service";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ToastrMessagesService} from "../../../../../core/Services/Shared Services/toastr-messages.service";
import {ToolbarService} from "../../../../../core/Services/Shared Services/toolbar.service";
import {ActionService} from "../../../../../core/Services/Shared Services/action.service";
import {DialogService} from "../../../../../core/Services/Shared Services/dialog.service";
import {concatMap, Observable, tap, toArray} from "rxjs";
import {AddressFormComponent} from "../address-form/address-form.component";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent extends BaseTable implements OnInit {
  @Input() currencyId!: string
  count = signal<number>(0)
  addresses!: Observable<any>;
  _refreshRows = signal<any>([])

  constructor(
    private activateroute: ActivatedRoute,
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toast: ToastrMessagesService,
    private toolbarService: ToolbarService,
    private actionService: ActionService,
    private dialogService: DialogService
  ) {
    super(
      [
        {field: 'address', pipe: ''},
        {field: 'status', pipe: 'toggle', path: ''},
        {field: 'delete', pipe: 'delete', path: Api_Endpoints.currency.address.delete},
        {field: 'edit', pipe: 'edit', dialog: true},
      ],
      exchangeService,
      Api_Endpoints.currency.address.show,
      ''
    )
  }

  ngOnInit() {
    this.getCurrencyAccounts()
  }

  getCurrencyAccounts(page = 1) {
    if (+this.currencyId) {
      this.addresses = this.exchangeService.getCurrencyAccounts({currency_id: +this.currencyId, page}).pipe(
        concatMap((response) => {
            this.count.set(response.total_record)
            return response.data
          }
        ),
        toArray(), tap((res) => {
          console.log(res)
        }))
    }
  }

  onCreate = effect(() => {
    if (this.toolbarService.actions.create() > 1) {
      this.openEditDialog({currency_id: this.currencyId})
    }
  })

  onSync = effect(() => {
    if (this.dialogService.response() != null) {
      this.getCurrencyAccounts()
      this.cdr.detectChanges()
    }
  }, {allowSignalWrites: true})

  //listen to signal delete signal for refresh data
  onِDelete = effect(() => {
    if (this.actionService._refreshData() != null) {
      this.getCurrencyAccounts()
      this.cdr.detectChanges()
    }
  }, {allowSignalWrites: true})

  override cellClicked(row: any) {
    if (row.colDef.field === 'edit') {
      this.openEditDialog(
        {
          currency_id: this.currencyId,
          status: row.data.status,
          id: row.data.id,
          address: row.data.address
        }
      )
    }
  }

  openEditDialog(data: any) {
    this.dialogService.openDialog(data, AddressFormComponent)
  }

  handlePagination($event: any) {
    this.getCurrencyAccounts($event.pageIndex+1)
  }
}
