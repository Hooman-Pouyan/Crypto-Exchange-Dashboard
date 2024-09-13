import {Component, EventEmitter, OnInit, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";

@Component({
  selector: 'app-pair-currency-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm!: FormGroup;
  currencies = signal<any>([])
  baseCurrencies = signal<any>([])
  assetCurrencies = signal<any>([])
  base_asset = '';
  quote_asset = '';
  market = null
  is_margin_trading_allowed = null
  is_spot_trading_allowed = null
  status =null;
  @Output() _filteredParams = new EventEmitter<any>()

  constructor(
    public translateService: TranslateService,
    private exchangeService: ExchangeService,
    private formBuilder:FormBuilder) {
  }

  saveForm() {
    const filters = this.filterForm.value
    this._filteredParams.emit(filters)
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      base_asset: [''],
      quote_asset: [''],
      market: [],
      is_margin_trading_allowed: [],
      is_spot_trading_allowed: [],
      status: [],
    })
  }

  ngOnInit() {
    this.getAllCurrencies()
    this.initFilterForm()
  }

  getAllCurrencies() {
    this.exchangeService.getAllCurrencies().subscribe(
      (response) => {
        this.currencies.set(response)
        this.baseCurrencies.set(response)
        this.assetCurrencies.set(response)
      }
    )
  }

  filterBaseCurrencies($event: KeyboardEvent) {
    let currencies = this.currencies()
    // @ts-ignore
    currencies = currencies.filter(item => item.symbol.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0)
    this.baseCurrencies.set(currencies)
  }

  filterAssetCurrencies($event: KeyboardEvent) {
    let currencies = this.currencies()
    // @ts-ignore
    currencies = currencies.filter(item => item.symbol.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0)
    this.assetCurrencies.set(currencies)
  }
}
