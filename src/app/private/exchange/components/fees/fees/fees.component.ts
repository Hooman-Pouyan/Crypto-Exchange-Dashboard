import {ChangeDetectorRef, Component, effect, Input, signal} from '@angular/core';
import {concatMap, Observable, tap, toArray} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {FeeFormComponent} from "../fee-form/fee-form.component";
import {BaseTable} from "../../../../../core/Classes/Base_Table";
import {ExchangeService} from "../../../../../core/Services/Feature Services/exchange.service";
import {ToastrMessagesService} from "../../../../../core/Services/Shared Services/toastr-messages.service";
import {ToolbarService} from "../../../../../core/Services/Shared Services/toolbar.service";
import {ActionService} from "../../../../../core/Services/Shared Services/action.service";
import {DialogService} from "../../../../../core/Services/Shared Services/dialog.service";
import {Api_Endpoints} from "../../../../../core/Configs/Api_Endpoints";

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent extends BaseTable {
  @Input() type!: string
  @Input() id!: number

  count = signal<number>(0)
  fees!: Observable<any>;
  _refreshRows = signal<any>([])

  constructor(
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
        {field: 'fee', pipe: ''},
        {field: 'action_type', pipe: ''},
        {field: 'market', pipe: ''},
        // {field: 'blocked', pipe: 'toggle'},
        {field: 'delete', pipe: 'delete', path: Api_Endpoints.currency.setting.delete},
        {field: 'edit', pipe: 'edit', dialog: true},
      ],
      exchangeService,
      Api_Endpoints.currency.address.show,
      ''
    )
  }

  ngOnInit() {
    this.getCurrencySettings()
  }

  getCurrencySettings(page=1) {
    if (+this.id) {
      const params=this.type==='currency'?{currency_id:+this.id,page}:{currency_pair_id:+this.id,page}
      this.fees = this.exchangeService.getCurrencySettings(params).pipe(
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
      this.openEditDialog(this.type==='currency'?{currency_id: this.id,symbol_type:this.type}:{currency_pair_id: this.id,symbol_type:this.type})
    }
  })

  onSync = effect(() => {
    if (this.dialogService.response() != null) {
      this.getCurrencySettings()
      this.cdr.detectChanges()
    }
  }, {allowSignalWrites: true})

  //listen to signal delete signal for refresh data
  onِDelete = effect(() => {
    if (this.actionService._refreshData() != null) {
      this.getCurrencySettings()
      this.cdr.detectChanges()
    }
  }, {allowSignalWrites: true})

  override cellClicked(row: any) {
    if (row.colDef.field === 'edit') {
      this.openEditDialog(
        {
          id: row.data.id,
          currency_id: row.data.currency_id,
          currency_pair_id: row.data.currency_pair_id,
          action_type: row.data.action_type,
          blocked: row.data.blocked,
          fee: row.data.fee,
          market: row.data.market,
          symbol_type: row.data.symbol_type,
          weekly_limit: row.data.weekly_limit,
          monthly_limit: row.data.monthly_limit,
          daily_limit: row.data.daily_limit,
        }
      )
    }
  }

  openEditDialog(data: any) {
    this.dialogService.openDialog(data, FeeFormComponent)
  }

  handlePagination($event: any) {
    this.getCurrencySettings($event.pageIndex+1)
  }
}
