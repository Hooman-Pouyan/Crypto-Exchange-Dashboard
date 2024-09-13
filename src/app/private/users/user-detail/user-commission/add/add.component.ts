import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {ExchangeService} from 'src/app/core/Services/Feature Services/exchange.service';
import {UserService} from 'src/app/core/Services/Feature Services/user.service';
import {DialogService} from 'src/app/core/Services/Shared Services/dialog.service';
import {ToastrMessagesService} from 'src/app/core/Services/Shared Services/toastr-messages.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent {
  markets: any[] = []
  currencies$!: Observable<any[]>;
  pairCurrencies$!: Observable<any>;

  commissionForm: FormGroup = this.fb.group({
    user_id: new FormControl(this.data.data.user_id),
    fee: new FormControl(this.data.data.fee),
    action_type: new FormControl(this.data.data.action_type),
    market: new FormControl(this.data.data.market),
    symbol_type: new FormControl(this.data.data.symbol_type),
    symbol: new FormControl(this.data.data.symbol),
    blocked: new FormControl(this.data.data.blocked),
    daily_limit: new FormControl(this.data.data.daily_limit),
    weekly_limit: new FormControl(this.data.data.weekly_limit),
    monthly_limit: new FormControl(this.data.data.monthly_limit),
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private exchangeservice: ExchangeService,
    private toast: ToastrMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.getMarkets()
    this.currencies$ = this.exchangeservice.fetchAll(Api_Endpoints.currency.all, {})
    this.pairCurrencies$ = this.exchangeservice.fetchAll(Api_Endpoints.currency_pairs.all, {})
  }

  onSubmit() {
    if (this.data.data['fee'] == '') this.userService.addUserCommission(this.data.data.user_id, this.commissionForm.value).subscribe(
      res => {
        if (res) this.toast.showSuccess("کارمزد با موفقیت ایجاد شد")
        this.dialogService.response.set(!this.dialogService.response())
        this.dialog.closeAll()
      }
    );
    else this.userService.updateUserCommission(this.data.data.id, this.commissionForm.value).subscribe(
      res => {
        if (res) this.toast.showSuccess("کارمزد با موفقیت آپدیت شد")
        this.dialogService.response.set(!this.dialogService.response())
        this.dialog.closeAll()
      })
  }

  getMarkets() {
    this.userService.getMarkets().subscribe(
      (response) => {
        this.markets = response
      }
    )
  }
}
