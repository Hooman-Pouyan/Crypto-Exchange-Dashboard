import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SettingsService} from '../../services/settings.service';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ExchangeService} from 'src/app/core/Services/Feature Services/exchange.service';
import {from, map, toArray} from 'rxjs';
import {environment} from 'src/environments/environment';
import { ToastrMessagesService } from 'src/app/core/Services/Shared Services/toastr-messages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
  countries: any[] | undefined;

  constructor(
    private settinfService: SettingsService,
    private exchangeService: ExchangeService,
    private toast: ToastrMessagesService,
    private translate: TranslateService,
  ) {
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
    ];
  }

  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  onSubmit(type: string, value: any) {
    const data = {
      value: value,
      status: true
    }
    switch (type) {
      case 'MIN_BALANCE_BINANCE':
        this.settinfService.updateSettings(Api_Endpoints.settings.MIN_BALANCE_BINANCE, data).subscribe(
          res => console.log(res)
        )
        break
      case 'MOBILE_NOTIFICATION_TO_MANAGER':
        this.settinfService.updateSettings(Api_Endpoints.settings.MOBILE_NOTIFICATION_TO_MANAGER, data).subscribe(
          res => console.log(res)
        )
        break
      case 'EMAIL_NOTIFICATION_TO_MANAGER':
        this.settinfService.updateSettings(Api_Endpoints.settings.EMAIL_NOTIFICATION_TO_MANAGER, data).subscribe(
          res => console.log(res)
        )
        break
    }

  }

  MIN_BALANCE_BINANCE!: string;
  MOBILE_NOTIFICATION_TO_MANAGER!: string;
  EMAIL_NOTIFICATION_TO_MANAGER!: string;

  selectedCountry: any;
  withdrawFiatConfirm: FormGroup = new FormGroup({
    status: new FormControl(''),
    value: new FormControl(''),
  })
  withdrawFiat: FormGroup = new FormGroup({
    value: new FormControl(''),
    status: new FormControl(''),
  })
  maxWithdrawFiat: FormGroup = new FormGroup({
    status: new FormControl(''),
    value: new FormControl(''),
  })
  withdrawCryptoConfirm: FormGroup = new FormGroup({
    status: new FormControl(''),
    value: new FormControl(''),
  })
  withdrawCrypto: FormGroup = new FormGroup({
    value: new FormControl(''),
    status: new FormControl(''),
  })
  maxWithdrawCrypto: FormGroup = new FormGroup({
    status: new FormControl(''),
    value: new FormControl(''),
  })
  withdrawNotification: FormGroup = new FormGroup({
    status: new FormControl(''),
    value: new FormControl(''),
  })

  selectFiat(e: any) {

  }

  settings: any = [
    {
      type: "fiat",
      name: "withdrawFiatConfirm",
      api: Api_Endpoints.settings.withdrawFiatConfirm,
      form: {
        status: true,
        value: false
      }
    },
    {
      type: "fiat",
      name: "withdrawFiat",
      api: Api_Endpoints.settings.withdrawFiat,
      form: {
        status: false,
        value: true
      }
    },
    {
      type: "fiat",
      name: "maxWithdrawFiat",
      api: Api_Endpoints.settings.maxWithdrawFiat,
      form: {
        status: true,
        value: true
      }
    },
    {
      type: "crypto",
      name: "withdrawCryptoConfirm",
      api: Api_Endpoints.settings.withdrawCryptoConfirm,
      form: {
        status: true,
        value: false
      }
    },
    {
      type: "crypto",
      name: "withdrawCrypto",
      api: Api_Endpoints.settings.withdrawCrypto,
      form: {
        status: false,
        value: true
      }
    },
    {
      type: "crypto",
      name: "maxWithdrawCrypto",
      api: Api_Endpoints.settings.maxWithdrawCrypto,
      form: {
        status: true,
        value: true
      }
    },
  ]

  cdnUrl = environment.cdnUrl

  formGroup!: FormGroup;

  stateOptions: any[] = [
    {label: 'غیرفعال', value: false},
    {label: 'فعال', value: true}
  ];

  fiats: any[] = []
  cryptos: any[] = []

  ngOnInit() {

    this.fetchSettingsList(Api_Endpoints.settings.withdrawCryptoConfirm)
    this.fetchSettingsList(Api_Endpoints.settings.withdrawNotification)
    this.fetchSettingsList(Api_Endpoints.settings.withdrawFiatConfirm)
    this.fetchSettingsList(Api_Endpoints.settings.withdrawCrypto)
    this.fetchSettingsList(Api_Endpoints.settings.withdrawFiat)
    this.fetchSettingsList(Api_Endpoints.settings.maxWithdrawCrypto)
    this.fetchSettingsList(Api_Endpoints.settings.maxWithdrawFiat)
    this.fetchSettingsList(Api_Endpoints.settings.MIN_BALANCE_BINANCE)
    this.fetchSettingsList(Api_Endpoints.settings.MOBILE_NOTIFICATION_TO_MANAGER)
    this.fetchSettingsList(Api_Endpoints.settings.EMAIL_NOTIFICATION_TO_MANAGER)

    this.fetchFiats()
  }

  fetchSettingsList(api: string) {
    this.settinfService.fetchSettings(api).subscribe({
      next: (res) => {
        this.fillData(res)
      }
    })
  }

  selectedCrypto: any=''
  selectedFiat: any='';

  fillData(data: any) {
    switch (data.key) {
      case "MAX_WITHDRAW_CRYPTO_CURRENCY":
        this.maxWithdrawCrypto.setValue({
          value: data.value,
          status: data.status,
        })
        break;
      case "WITHDRAW_FIAT_MANAGER_CONFIRMATION":
        this.withdrawFiatConfirm.setValue({
          value: "",
          status: data.status,
        })
        break;
      case "MAX_WITHDRAW_FIAT":
        this.maxWithdrawFiat.setValue({
          value: data.value,
          status: data.status,
        })
        break;
      case "WITHDRAW_FIAT_CURRENCY_INTERFACE":
        this.withdrawFiat.setValue({
          value: data.value,
          status: data.status,
        })
        break;
      case "WITHDRAW_CRYPTO_CURRENCY_CURRENCY_INTERFACE":
        this.withdrawCrypto.setValue({
          value: data.value,
          status: data.status,
        })
        break;
      case "WITHDRAW_CRYPTO_CURRENCY_MANAGER_CONFIRMATION":
        this.withdrawCryptoConfirm.setValue({
          value: "",
          status: data.status,
        })
        break
      case "SEND_NOTIFICATION_WITHDRAW_TASK":
        this.withdrawNotification.setValue({
          value: "",
          status: data.status,
        })
        break
      case "MIN_BALANCE_BINANCE":
        this.MIN_BALANCE_BINANCE = data.value
        break
      case "MOBILE_NOTIFICATION_TO_MANAGER":
        this.MOBILE_NOTIFICATION_TO_MANAGER = data.value
        break
      case "EMAIL_NOTIFICATION_TO_MANAGER":
        this.EMAIL_NOTIFICATION_TO_MANAGER = data.value
        break

    }
  }

  fetchFiats() {
    this.exchangeService.fetchAll(Api_Endpoints.currency.all, {}).pipe(
      map(googooli => from(googooli).pipe(
        toArray()
      )),
    ).subscribe(res => {
      res.subscribe(
        (response: any) => {
          this.fiats = response.filter((item: any) => item.unit === 'fiat')
          this.cryptos = response.filter((item: any) => item.unit === 'crypto')
        }
      )
    })
  }

  updateSetting(api: any, value: any) {
    this.settinfService.updateSettings(api, value).subscribe(res => {
      if (res['id']) this.toast.showSuccess(
        `${this.translate.instant('withdrawsettings.' + res.key)} با موفقیت آپدیت شد`
      )
    })
  }

  onChange(e: any, form: any) {
    switch (form) {
      case "maxWithdrawCrypto":
        this.updateSetting(Api_Endpoints.settings.maxWithdrawCrypto, this.maxWithdrawCrypto.value)
        break;
      case "withdrawFiatConfirm":
        this.updateSetting(Api_Endpoints.settings.withdrawFiatConfirm, this.withdrawFiatConfirm.value)
        break;
      case "withdrawNotification":
        this.updateSetting(Api_Endpoints.settings.withdrawNotification, this.withdrawNotification.value)
        break;
      case "maxWithdrawFiat":
        this.updateSetting(Api_Endpoints.settings.maxWithdrawFiat, this.maxWithdrawFiat.value)
        break;
      case "withdrawFiat":
        this.withdrawFiat.setValue({
          status: true,
          value: e
        })
        this.updateSetting(Api_Endpoints.settings.withdrawFiat, this.withdrawFiat.value)
        break;
      case "withdrawCrypto":
        this.withdrawCrypto.setValue({
          status: true,
          value: e
        })
        this.updateSetting(Api_Endpoints.settings.withdrawCrypto, this.withdrawCrypto.value)
        break;
      case "withdrawCryptoConfirm":
        this.updateSetting(Api_Endpoints.settings.withdrawCryptoConfirm, this.withdrawCryptoConfirm.value)
        break

    }


  }

  protected readonly crypto = crypto;
}
