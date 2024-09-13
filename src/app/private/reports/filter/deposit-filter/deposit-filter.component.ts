import {Component, EventEmitter, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ExchangeService} from "../../../../core/Services/Feature Services/exchange.service";
import * as moment from "jalali-moment";

@Component({
  selector: 'app-deposit-filter',
  templateUrl: './deposit-filter.component.html',
  styleUrls: ['./deposit-filter.component.scss']
})
export class DepositFilterComponent {
  filterForm!: FormGroup;
  status = null;
  currency = ''
  fromDate = ''
  toDate = ''
  fromAmount = ''
  toAmount = ''
  mobile = ''
  @Output() _filteredParams = new EventEmitter<any>()

  constructor(
    public translateService: TranslateService,
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder) {
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
      from_amount:[''],
      to_amount:[''],
      mobile: ''
    })
  }

  ngOnInit() {
    this.initFilterForm()
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
}
