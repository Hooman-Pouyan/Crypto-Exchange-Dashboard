import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { ClubService } from 'src/app/core/Services/Feature Services/club.service';
import { ExchangeService } from 'src/app/core/Services/Feature Services/exchange.service';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import { DialogService } from 'src/app/core/Services/Shared Services/dialog.service';
import { ToastrMessagesService } from 'src/app/core/Services/Shared Services/toastr-messages.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent {

  currencies$!: Observable<any[]>;
  pairCurrencies$!: Observable<any>;

  commissionForm: FormGroup = this.fb.group({
    poan_level_id: new FormControl(this.data.data.poan_level_id),
    fee: new FormControl(this.data.data.fee),
    action_type: new FormControl(this.data.data.action_type),
    market: new FormControl(this.data.data.market),
    symbol_type: new FormControl(this.data.data.symbol_type),
    symbol: new FormControl(this.data.data.symbol),
    blocked: new FormControl(this.data.data.blocked),
    grade: "level",
    daily_limit: new FormControl(this.data.data.daily_limit),
    weekly_limit: new FormControl(this.data.data.weekly_limit),
    monthly_limit: new FormControl(this.data.data.monthly_limit),
  })

  constructor(
    private fb:FormBuilder,
    private clubService:ClubService,
    private exchangeservice:ExchangeService,
    private toast:ToastrMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogService:DialogService,
    ) {
      this.currencies$ = this.exchangeservice.fetchAll(Api_Endpoints.currency.all, {})
      this.pairCurrencies$ = this.exchangeservice.fetchAll(Api_Endpoints.currency_pairs.crud.list, {})

    }

    onSubmit(){
      if (this.data.data['fee'] == '') this.clubService.addLevelCommission(this.data.data.poan_level_id,this.commissionForm.value).subscribe(res => {
        if (res) this.toast.showSuccess("کارمزد با موفقیت ایجاد شد")
          this.dialogService.response.set(!this.dialogService.response())
        this.dialog.closeAll()

      });
      else this.clubService.updateLevelCommission(this.data.data.id,this.commissionForm.value).subscribe(res => {
        if (res) this.toast.showSuccess("کارمزد با موفقیت آپدیت شد")
          this.dialogService.response.set(!this.dialogService.response())
        this.dialog.closeAll()
      })
  }

}
