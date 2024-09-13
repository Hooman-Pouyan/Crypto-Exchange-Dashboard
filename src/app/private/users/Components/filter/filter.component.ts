import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { ExchangeService } from 'src/app/core/Services/Feature Services/exchange.service';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

  @Output() newUser = new EventEmitter<any>()

  filterForm!: FormGroup;
  users = signal<any>([])
  fullname = '';
  mobile = '';
  blocked = null
  online = null
  @Output() _filteredParams = new EventEmitter<any>()

  constructor(
    public translateService: TranslateService,
    private exchangeService: ExchangeService,
    private formBuilder:FormBuilder,
    private userService:UserService) {
  }

  saveForm() {
    const filters = this.filterForm.value
    this._filteredParams.emit(filters)
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      fullname: [''],
      mobile: [''],
      blocked: null,
      role_id: "",
      identity_status: "",
      online: ''
    })
  }

  ngOnInit() {
    // this.getAllUsers()
    this.initFilterForm()
  }

  createUser(){
    this.newUser.emit()

  }

  // getAllUsers() {
  //   this.userService.fetchAll(Api_Endpoints.user.list, {page: 1}).subscribe(
  //     (response) => {
  //       this.users.set(response)
  //     }
  //   )
  // }

}
