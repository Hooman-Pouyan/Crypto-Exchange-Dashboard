import {Component, ElementRef, EventEmitter, OnInit, Output, signal, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "jalali-moment";
import {ClubService} from 'src/app/core/Services/Feature Services/club.service';


@Component({
  selector: 'app-currency-filter',
  templateUrl: './currency-filter.component.html',
  styleUrls: ['./currency-filter.component.scss']
})
export class CurrencyFilterComponent implements OnInit {
  filterForm!: FormGroup;
  currencies = signal<any>([])
  filteredCurrencies = signal<any>([])
  filteredDestinCurrencies = signal<any>([])
  levels = signal<any>([])
  status = null;
  currency = ''
  destin_currency = ''
  level = ''
  fromDate = ''
  toDate = ''
  mobile = ''
  @Output() _filteredParams = new EventEmitter<any>()

  constructor(
    public translateService: TranslateService,
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder,
    private clubService: ClubService) {
  }

  saveForm() {
    const filters = this.filterForm.value
    this._filteredParams.emit(filters)
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      user: [''],
      status: [],
      to_date: [''],
      from_date: [''],
      currency: [''],
      destin_currency: [''],
      club_id: [''],
      mobile: ''
    })
  }

  ngOnInit() {
    this.getAllCurrencies()
    this.getAllLevels()
    this.initFilterForm()
  }

  getAllCurrencies() {
    this.exchangeService.getAllCurrencies().subscribe(
      (response) => {
        this.currencies.set(response)
        this.filteredCurrencies.set(response)
        this.filteredDestinCurrencies.set(response)
      }
    )
  }

  getAllLevels() {
    this.clubService.getAllLevels().subscribe(
      (response) => {
        this.levels.set(response.data)

      }
    )
  }

  onDateChanged(parameter: string) {
    let date = '';
    if (parameter === 'from') {
      date = this.filterForm.get('from_date')?.value
      const convertedDate = moment.from(date, 'fa').format('YYYY-MM-DD')
      this.filterForm.patchValue({
        from_date: convertedDate
      })
    } else if (parameter === 'to') {
      date = this.filterForm.get('to_date')?.value
      const convertedDate = moment.from(date, 'fa').format('YYYY-MM-DD')
      this.filterForm.patchValue({
        to_date: convertedDate
      })
    }
  }

  filterResult($event: any, type: string) {
    let currencies = this.currencies()
    // @ts-ignore
    currencies = currencies.filter(item => item.symbol.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0)
    if (type === 'destinCurrency')
      this.filteredDestinCurrencies.set(currencies)
    else if(type==='currency')
      this.filteredCurrencies.set(currencies)
  }
}
