import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {SupportService} from "../../../../core/Services/Feature Services/support.service";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {DialogService} from "../../../../core/Services/Shared Services/dialog.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  status = '';
  reason = '';
  id = -1;
  endPoint = '';
  updateData: any = {}
  depositDetail: any;
  cdnUrl=environment.cdnUrl

  constructor(
    private supportService: SupportService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.id = data.data.id
    this.getDepositDetails()
  }

  submitForm() {
    this.getEndPoint()
    this.supportService.patchData(this.id, this.updateData, this.endPoint).subscribe(
      (response) => {
        this.dialogService.response.set(!this.dialogService.response())
        this.dialog.closeAll()
      }
    )
  }

  getEndPoint() {
    if (this.status === 'accept') {
      this.updateData = {}
      this.endPoint = Api_Endpoints.support.offlineDeposit.accept;
    } else {
      if (this.status === 'reject') {
        this.endPoint = Api_Endpoints.support.offlineDeposit.reject;
      } else if (this.status === 'modify') {
        this.endPoint = Api_Endpoints.support.offlineDeposit.modify;
      } else if (this.status === 'money') {
        this.endPoint = Api_Endpoints.support.offlineDeposit.money;
      }
      this.updateData = {
        reason: this.reason
      }
    }
  }

  getDepositDetails() {
    this.supportService.fetchById(this.id, Api_Endpoints.support.offlineDeposit.show).subscribe(
      (response) => {
        this.depositDetail = response
      }
    )
  }
}
