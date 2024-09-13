import {Component, Inject} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExchangeService} from "../../../../../core/Services/Feature Services/exchange.service";
import {ToastrMessagesService} from "../../../../../core/Services/Shared Services/toastr-messages.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ToolbarService} from "../../../../../core/Services/Shared Services/toolbar.service";
import {DialogService} from "../../../../../core/Services/Shared Services/dialog.service";
import {TranslateService} from "@ngx-translate/core";
import {Api_Endpoints} from "../../../../../core/Configs/Api_Endpoints";
import {UserService} from "../../../../../core/Services/Feature Services/user.service";

@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.scss']
})
export class FeeFormComponent {
  currencies$!: Observable<any[]>;
  pairCurrencies$!: Observable<any>;
  feeForm!: FormGroup
  disableForm = false;
  formStatus = 'add';
  markets: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private toast: ToastrMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private userService: UserService,
    private toolbarService:ToolbarService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {
    this.currencies$ = this.exchangeService.fetchAll(Api_Endpoints.currency.all, {})
    this.pairCurrencies$ = this.exchangeService.fetchAll(Api_Endpoints.currency_pairs.crud.list, {})
  }

  ngOnInit() {
    this.groupForm()
    this.setFormStatus()
    this.getMarkets()
  }

  groupForm() {
    console.log(this.data)
    this.feeForm = this.formBuilder.group({
      id: [this.data?.id],
      currency_id: [this.data?.currency_id],
      currency_pair_id: [this.data?.currency_pair_id],
      fee: [this.data?.fee, Validators.required],
      action_type: [this.data?.action_type, Validators.required],
      market: [this.data?.market,Validators.required],
      symbol_type: [this.data?.symbol_type],
      blocked: [this.data?.blocked],
      daily_limit: [this.data?.daily_limit],
      weekly_limit: [this.data?.weekly_limit],
      monthly_limit: [this.data?.monthly_limit],
    })
  }

  onSubmit() {
    if (this.feeForm.valid) {
      this.disableForm = !this.disableForm
      if (this.formStatus === 'add') {
        this.exchangeService.addCurrencySetting(Api_Endpoints.currency.setting.add, this.feeForm.value).subscribe(
          (response) => {
            this.successResponse()
          }
        )
      } else {
        this.exchangeService.updateData(this.feeForm.value, Api_Endpoints.currency.setting.edit).subscribe(
          (response) => {
            this.successResponse()
          }
        )
      }
    }
  }

  successResponse() {
    this.disableForm = !this.disableForm
    this.toast.showSuccess(this.translate.instant('task done successfully'))
    this.dialog.closeAll()
    this.dialogService.response.set(!this.dialogService.response())
  }

  setFormStatus() {
    if (this.data?.id)
      this.formStatus = 'edit'
  }

  resetSignal() {
    this.toolbarService.actions.create.set(1)
  }

  getMarkets() {
    this.userService.getMarkets().subscribe(
      (response) => {
        this.markets = response
      }
    )
  }
}
