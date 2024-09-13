import {Component, EventEmitter, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  filterForm!: FormGroup;
  currencies = signal<any>([])
  filteredCurrencies = signal<any>([])
  currency = '';
  deposit_enable = null
  withdraw_enable = null
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
      currency: [''],
      deposit_enable: [],
      withdraw_enable: [],
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
        this.filteredCurrencies.set(response)
      }
    )
  }

  filterResult($event: any) {
    let currencies = this.currencies()
    // @ts-ignore
    currencies = currencies.filter(item => item.symbol.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0)
    this.filteredCurrencies.set(currencies)
  }
}
