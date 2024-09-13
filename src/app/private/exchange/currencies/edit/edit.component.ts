import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router"
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ExchangeService} from 'src/app/core/Services/Feature Services/exchange.service';
import {TranslateService} from "@ngx-translate/core";
import {ToastrMessagesService} from "../../../../core/Services/Shared Services/toastr-messages.service";
import {MenuItem} from "primeng/api";
import {ToolbarService} from "../../../../core/Services/Shared Services/toolbar.service";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class EditComponent {
  sellStatus = '';
  buyStatus = '';
  currencyId!: string
  selectedUnit: any
  currencyData = signal<any>({});
  form!: FormGroup
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  formStatus = 'add'
  length = 0;
  defaultDescriptions = [
    {
      "id": 280,
      "currency_id": 69,
      "language_id": 2,
      "name": "",
      "code": "",
      "position": "",
      "description": "",
      "language_code": "en"
    },
    {
      "id": 281,
      "currency_id": 69,
      "language_id": 1,
      "name": "",
      "code": "",
      "position": "",
      "description": "",
      "language_code": "fa"
    },
    {
      "id": 282,
      "currency_id": 69,
      "language_id": 3,
      "name": "",
      "code": "",
      "position": "",
      "description": "",
      "language_code": "ar"
    },
    {
      "id": 283,
      "currency_id": 69,
      "language_id": 4,
      "name": "",
      "code": "",
      "position": "",
      "description": "",
      "language_code": "tr"
    }
  ]

  constructor(
    private activateRoute: ActivatedRoute,
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toast: ToastrMessagesService,
    private toolbarService: ToolbarService,
    private dialogService: DialogService
  ) {

  }


  ngOnInit(): void {
    this.initTabItems()
    this.groupForm()
    this.activateRoute.paramMap.subscribe(res => {
      this.currencyId = res.get("id")!
      if (this.currencyId) {
        this.formStatus = 'edit'
        this.exchangeService.fetchById(res.get("id")!, Api_Endpoints.currency.crud.show).subscribe(data => {
          this.currencyData.set(data)
          this.groupForm(data)
          this.addDescriptions()
        })
      } else {
        this.addDescriptions()
      }

    })

  }

  submitForm(state: number) {
    if (this.form.valid) {
      let data: any = this.modifyData()
      let apiUrl = '';
      if (this.formStatus === 'edit') {
        apiUrl = Api_Endpoints.currency.crud.update
        this.exchangeService.updateData(data, apiUrl).subscribe(
          (response) => {
            this.handleState(state)
          }
        )
      } else {
        apiUrl = Api_Endpoints.currency.crud.add
        this.exchangeService.addData(data, apiUrl).subscribe(
          (response) => {
            this.handleState(state)
          }
        )
      }
    }
  }

  groupForm(data?: any) {
    this.selectedUnit = data?.unit
    this.form = this.formBuilder.group({
      id: [data?.id],
      slug: [data?.slug],
      symbol: [data?.symbol],
      unit: [data?.unit],
      symbol_type: [data?.symbol_type],
      priority: [data?.priority],
      provider: [data?.provider ? data?.provider : {name: "CoinMarketCap"}],
      descriptions: this.formBuilder.array([]),
      exchange_fee: [data?.exchange_fee],
      exchange_sell_rate_change: [data?.exchange_sell_rate_change],
      exchange_buy_rate_change: [data?.exchange_buy_rate_change],
      min_exchange: [data?.min_exchange],
      max_exchange: [data?.max_exchange],
      min_price: [data?.min_price],
      max_price: [data?.max_price],
      unit_coefficient: [data?.unit_coefficient],
      currency_precision: [data?.currency_precision],
      status: [data?.status ? data?.status : false],
      is_default: [data?.is_default ? data?.is_default : false],
      bank_connection: [data?.bank_connection ? data?.bank_connection : false],
    })
  }

  get descriptions(): FormArray {
    return this.form.get("descriptions") as FormArray
  }

  newDescription(item: any, langCode: string): FormGroup {
    return this.formBuilder.group({
      id: item.id,
      currency_id: item.currency_id,
      language_id: item.language_id,
      name: item.name,
      code: item.code,
      position: item.position,
      description: item.description,
      language_code: langCode
    })
  }

  addDescriptions() {
    if (this.formStatus === 'add') {
      this.defaultDescriptions.forEach(item => {
        this.descriptions.push(this.newDescription(item, item.language_code))
      })
    } else {
      console.log(this.currencyData().descriptions)
      Object.keys(this.currencyData().descriptions).forEach(item => {
        this.descriptions.push(this.newDescription(this.currencyData().descriptions[item], item))
      })
    }
    this.cdr.detectChanges()
  }

  generateLabel(item: any) {
    if (item.get('language_code').value === 'fa')
      return this.translate.instant('languages.persian')
    else if (item.get('language_code').value === 'en')
      return this.translate.instant('languages.english')
    else if (item.get('language_code').value === 'tr')
      return this.translate.instant('languages.turkey')
    else if (item.get('language_code').value === 'ar')
      return this.translate.instant('languages.arabic')
  }

  handleState(state: number) {
    if (state === 1) {
      this.router.navigate(['Dashboard/exchange/currency'])
    } else if (state === 2) {
      this.groupForm()
      this.formStatus = 'add'
      this.addDescriptions()
    }
    this.toast.showSuccess(this.translate.instant('task done successfully'))
  }

  modifyData() {
    let data: any = this.form.value
    data['descriptions'] = {}
    this.descriptions.controls.forEach(item => {
      data.descriptions[item.value.language_code] = {
        name: item.value.name,
        code: item.value.code,
        description: item.value.description
      }
    })

    if (this.selectedUnit !== 'fiat') {
      delete data['min_price']
      delete data['max_price']
    }

    return data;
  }

  initTabItems() {
    this.items = [
      {label: this.translate.instant('Basic Information'), icon: 'pi pi-fw pi-home', id: '1'},
      {label: this.translate.instant('address'), icon: 'pi pi-fw pi-wallet', id: '2'},
      {label: this.translate.instant('settings'), icon: 'pi pi-fw pi-wallet', id: '3'},
    ];
    this.activeItem = this.items![0];
  }

  onActiveItemChange(event: MenuItem) {
    this.toolbarService.toolbarActionsReset()

    const index = this.items?.findIndex(x => x.id == event.id)
    if (this.items)
      this.activeItem = this.items[index!]
  }

  changeBuy(method: string) {
    this.buyStatus = method
    const value = this.form.get('exchange_buy_rate_change')?.value
    this.form.patchValue({
      exchange_buy_rate_change: method === 'plus' ? Math.abs(value) : -Math.abs(value)
    })
  }

  changeSell(method: string) {
    this.sellStatus = method
    const value = this.form.get('exchange_sell_rate_change')?.value
    this.form.patchValue({
      exchange_sell_rate_change: method === 'plus' ? Math.abs(value) : -Math.abs(value)
    })
  }
}












