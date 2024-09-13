import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {
  @Input() currencies: any[] = []
  @Output() result = new EventEmitter<any>()
  filteredCurrencies: any[] = []
  currency = ''

  ngOnChanges(changes: SimpleChanges) {
    this.currencies = changes['currencies'].currentValue
    this.filteredCurrencies = this.currencies
  }

  filterResult($event: string) {
    let currencies = this.currencies
    // @ts-ignore
    currencies = currencies.filter(item => item.currency.toLowerCase().indexOf($event) >= 0)
    this.filteredCurrencies = currencies
    this.result.emit(currencies)
  }

  changeCurrency($event: string) {
    this.filterResult($event.toLowerCase())
  }

  searchCurrency($event: any) {
    this.filterResult($event.target.value.toLowerCase())
  }

  resetSearch() {
    this.currency=''
    this.filterResult('')
  }
}
