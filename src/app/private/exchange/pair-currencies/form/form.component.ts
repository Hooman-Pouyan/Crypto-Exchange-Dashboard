import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {ToastrMessagesService} from "../../../../core/Services/Shared Services/toastr-messages.service";
import {MenuItem} from "primeng/api";
import {ToolbarService} from "../../../../core/Services/Shared Services/toolbar.service";
import {UserService} from "../../../../core/Services/Feature Services/user.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  currencyId!: string
  currencyData = signal<any>({});
  form!: FormGroup
  formStatus = 'add'
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder,
              private toolbarService: ToolbarService,
              private exchangeService: ExchangeService,
              private cdr: ChangeDetectorRef,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private toast: ToastrMessagesService
  ) {
  }

  ngOnInit() {
    this.groupForm()
    this.initTabItems()
    this.activateRoute.paramMap.subscribe(res => {
      this.currencyId = res.get("id")!
      if (this.currencyId) {
        this.formStatus = 'edit'
        this.exchangeService.fetchById(res.get("id")!, Api_Endpoints.currency_pairs.crud.show).subscribe(data => {
          this.currencyData.set(data)
          this.groupForm(data)
        })
      }
    })
  }

  submitForm(state: number) {
    if (this.form.valid) {
      let apiUrl = '';
      if (this.formStatus === 'edit') {
        apiUrl = Api_Endpoints.currency_pairs.crud.update
        this.exchangeService.updateData(this.form.value, apiUrl).subscribe(
          (response) => {
            this.handleState(state)
          }
        )
      } else {
        apiUrl = Api_Endpoints.currency_pairs.crud.add
        this.exchangeService.addData(this.form.value, apiUrl).subscribe(
          (response) => {
            this.handleState(state)
          }
        )
      }
    }
  }

  groupForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      base_asset: [data?.base_asset],
      quote_asset: [data?.quote_asset],
      currency_pair: [data?.currency_pair],
      maker_fee: [data?.maker_fee],
      taker_fee: [data?.taker_fee],
      bid_multiplier_up: [data?.bid_multiplier_up],
      bid_multiplier_down: [data?.bid_multiplier_down],
      ask_multiplier_up: [data?.ask_multiplier_up],
      ask_multiplier_down: [data?.ask_multiplier_down],
      leverage_cross: [data?.leverage_cross],
      leverage_isolated: [data?.leverage_isolated],
      oco_allowed: [data?.oco_allowed ? data.oco_allowed : false],
      is_margin_trading_allowed: [data?.is_margin_trading_allowed ? data.is_margin_trading_allowed : false],
      is_spot_trading_allowed: [data?.is_spot_trading_allowed ? data.is_spot_trading_allowed : false],
      cross_margin_allowed: [data?.cross_margin_allowed ? data.cross_margin_allowed : false],
      isolated_margin_allowed: [data?.isolated_margin_allowed ? data.isolated_margin_allowed : false],
      limit: [data?.limit ? data.limit : false],
      stop_limit: [data?.stop_limit ? data.stop_limit : false],
      market: [data?.market ? data.market : false],
      status: [data?.status ? data.status : false],
      is_default: [data?.is_default ? data.is_default : false],
      base_asset_precision: [data?.base_asset_precision ? data.base_asset_precision : ''],
      quote_asset_precision: [data?.quote_asset_precision ? data.quote_asset_precision : '']
    })
    this.cdr.detectChanges()

  }

  handleState(state: number) {
    if (state === 1) {
      this.router.navigate(['Dashboard/exchange/currency_pairs'])
    } else if (state === 2) {
      this.groupForm()
      this.formStatus = 'add'
    }
    this.toast.showSuccess(this.translate.instant('task done successfully'))
  }

  initTabItems() {
    this.items = [
      {label: this.translate.instant('Basic Information'), icon: 'pi pi-fw pi-home', id: '1'},
      {label: this.translate.instant('fees'), icon: 'pi pi-fw pi-wallet', id: '2'},
    ];
    this.activeItem = this.items![0];
  }

  onActiveItemChange(event: MenuItem) {
    this.toolbarService.toolbarActionsReset()

    const index = this.items?.findIndex(x => x.id == event.id)
    if (this.items)
      this.activeItem = this.items[index!]
  }



}
