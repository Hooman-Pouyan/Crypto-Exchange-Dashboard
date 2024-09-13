import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrMessagesService} from "../../../../../core/Services/Shared Services/toastr-messages.service";
import {ExchangeService} from "../../../../../core/Services/Feature Services/exchange.service";
import {Api_Endpoints} from "../../../../../core/Configs/Api_Endpoints";
import {TranslateService} from "@ngx-translate/core";
import {DialogService} from "../../../../../core/Services/Shared Services/dialog.service";
import {ToolbarService} from "../../../../../core/Services/Shared Services/toolbar.service";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup
  disableForm = false;
  formStatus = 'add'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private toolbarService: ToolbarService,
    private toast: ToastrMessagesService) {
    if (this.data?.id)
      this.formStatus = 'edit'
  }

  ngOnInit() {
    this.groupForm()
  }

  groupForm() {
    this.addressForm = this.formBuilder.group({
      address: [this.data?.address, Validators.required],
      currency_id: [this.data.currency_id],
      status: [this.data?.status, Validators.required],
      id: [this.data?.id ? this.data.id : -1],
    })
  }

  addAddress() {
    if (this.addressForm.valid) {
      this.disableForm = !this.disableForm
      if (this.formStatus === 'add') {
        this.exchangeService.addCurrencyAddress(Api_Endpoints.currency.address.add, this.addressForm.value).subscribe(
          (response) => {
            this.successResponse()
          }
        )
      } else {
        this.exchangeService.updateData(this.addressForm.value, Api_Endpoints.currency.address.edit).subscribe(
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

  resetSignal() {
    this.toolbarService.actions.create.set(1)
  }
}
