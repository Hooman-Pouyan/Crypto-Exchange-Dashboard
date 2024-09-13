import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrMessagesService} from "../../../../core/Services/Shared Services/toastr-messages.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup
  currencies = signal<any>([])
  networkData = signal<any>({});
  networkId = '';
  formStatus = 'add'
  defaultDescriptions = [
    {
      "id": 301,
      "language_id": 2,
      "deposit_name": null,
      "deposit_description": null,
      "withdraw_description": null,
      "special_tips": null,
      "network_id": 149,
      "language_code": "en"
    },
    {
      "id": 302,
      "language_id": 1,
      "deposit_name": null,
      "deposit_description": null,
      "withdraw_description": null,
      "special_tips": null,
      "network_id": 149,
      "language_code": "fa"
    },
    {
      "id": 303,
      "language_id": 1,
      "deposit_name": null,
      "deposit_description": null,
      "withdraw_description": null,
      "special_tips": null,
      "network_id": 149,
      "language_code": "tr"
    },
    {
      "id": 304,
      "language_id": 1,
      "deposit_name": null,
      "deposit_description": null,
      "withdraw_description": null,
      "special_tips": null,
      "network_id": 149,
      "language_code": "ar"
    }
  ]

  constructor(
    public translate: TranslateService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toast: ToastrMessagesService
  ) {
  }

  submitForm(state: number) {
    if (this.form.valid) {
      let data: any = this.modifyData()
      let apiUrl = '';
      if (this.formStatus === 'edit') {
        apiUrl = Api_Endpoints.network.crud.update
        this.exchangeService.updateData(data, apiUrl).subscribe(
          (response) => {
            this.handleState(state)
          }
        )
      } else {
        apiUrl = Api_Endpoints.network.crud.add
        this.exchangeService.addData(data, apiUrl).subscribe(
          (response) => {
            this.handleState(state)
          }
        )
      }
    }
  }

  ngOnInit() {
    this.groupForm()
    this.getCurrencies()
    this.activateRoute.paramMap.subscribe(res => {
      this.networkId = res.get("id")!
      if (this.networkId) {
        this.formStatus = 'edit'
        this.exchangeService.fetchById(res.get("id")!, Api_Endpoints.network.crud.show).subscribe(data => {
          this.networkData.set(data)
          this.groupForm(data)
          this.addDescriptions()
        })
      } else {
        this.addDescriptions()
      }
    })
  }

  groupForm(data?: any) {
    let currencyArray: any[] = this.setSelectedCurrencies(data?.currency)
    this.form = this.formBuilder.group({
      id: [data?.id],
      network: [data?.network],
      currency: [data?.currency],
      min_confirm: [data?.min_confirm],
      address_regex: [data?.address_regex],
      contract_address: [data?.contract_address],
      memo_regex: [data?.memo_regex],
      withdraw_enable: [data?.withdraw_enable],
      withdraw_provider: [data?.withdraw_provider],
      withdraw_fee: [data?.withdraw_fee],
      withdraw_max: [data?.withdraw_max],
      withdraw_min: [data?.withdraw_min],
      deposit_provider: [data?.deposit_provider],
      deposit_enable: [data?.deposit_enable],
      deposit_max: [data?.deposit_max],
      deposit_min: [data?.deposit_min],
      status: [data?.status ? data.status : false],
      is_local: [data?.is_local ? data.is_local : false],
      is_default: [data?.is_default ? data.is_default : false],
      descriptions: this.formBuilder.array([]),
      currency_precision: [data?.currency_precision]
    })
  }

  getCurrencies() {
    this.exchangeService.getAllCurrencies().subscribe(
      (response) => {
        this.currencies.set(response)
      }
    )
  }

  get descriptions(): FormArray {
    return this.form.get("descriptions") as FormArray
  }

  newDescription(item: any, langCode: string): FormGroup {
    return this.formBuilder.group({
      deposit_name: item.deposit_name,
      deposit_description: item.deposit_description,
      id: item.id,
      language_code: langCode,
      language_id: item.language_id,
      network_id: item.network_id,
      special_tips: item.special_tips,
      withdraw_description: item.withdraw_description
    })
  }

  addDescriptions() {
    if (this.formStatus === 'add') {
      this.defaultDescriptions.forEach(item => {
        this.descriptions.push(this.newDescription(item, item.language_code))
      })
    } else {
      Object.keys(this.networkData().descriptions).forEach(item => {
        this.descriptions.push(this.newDescription(this.networkData().descriptions[item], item))
      })
    }
    this.cdr.detectChanges()
  }

  generateLabel(item: any) {
    if (item.get('language_code').value === 'fa')
      return this.translate.instant('languages.persian')
    else if (item.get('language_code').value === 'en')
      return this.translate.instant('languages.english')
    else if (item.get('language_code').value === 'ar')
      return this.translate.instant('languages.arabic')
    else if (item.get('language_code').value === 'tr')
      return this.translate.instant('languages.turkey')
  }

  setSelectedCurrencies(currency: string) {
    let tempArray: any[] = []
    if (currency) {
      let currencyArray = currency.split(',')
      currencyArray.forEach(item => {
        // @ts-ignore
        const index = this.currencies().findIndex(x => x.symbol === item)
        tempArray.push(this.currencies()[index].id)
      })
    }
    return tempArray;
  }

  handleState(state: number) {
    if (state === 1) {
      this.router.navigate(['Dashboard/exchange/network'])
    } else if (state === 2) {
      this.groupForm()
      this.formStatus = 'add'
      this.addDescriptions()
    }
    this.toast.showSuccess(this.translate.instant('task done successfully'))
  }

  modifyData() {
    let data = this.form.value
    data['descriptions'] = {}
    this.descriptions.controls.forEach(item => {
      data.descriptions[item.value.language_code] = {
        deposit_name: item.value.deposit_name,
        deposit_description: item.value.deposit_description,
        withdraw_description: item.value.withdraw_description,
        special_tips: item.value.special_tips
      }
    })

    data['status'] = data['status'] ? 1 : 0
    return data;
  }
}
