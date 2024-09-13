import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  filterForm!: FormGroup
  currencies = signal<any>([])
  filteredCurrencies = signal<any>([])
  name = '';
  symbol = '';
  unit = '';
  status = null
  mobile = ""
  @Output() _filteredParams = new EventEmitter<any>()

  constructor(private formBuilder: FormBuilder, public translateService: TranslateService, private exchangeService: ExchangeService) {
  }

  ngOnInit() {
    this.initFilterForm()
    this.getAllCurrencies()
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      name: [''],
      symbol: [''],
      unit: [''],
      status: [],
      mobile: '',
    })
  }

  saveForm() {
    const filters = this.filterForm.value
    this._filteredParams.emit(filters)
  }

  translate(key: string) {
    return this.translateService.instant(key)
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
    currencies = currencies.filter(item => item.slug.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0)
    this.filteredCurrencies.set(currencies)
  }
}
