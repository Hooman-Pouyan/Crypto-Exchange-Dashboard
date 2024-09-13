import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, concatMap, map, tap, toArray } from 'rxjs';
import { BaseTable } from 'src/app/core/Classes/Base_Table';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { UserService } from 'src/app/core/Services/Feature Services/user.service';
import { ToolbarService } from 'src/app/core/Services/Shared Services/toolbar.service';


@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class UserWalletComponent extends BaseTable {

  userWallet!: Observable<any>
  userWallet$ = new BehaviorSubject<any>([])

  @Input() symbol_type: any;
  @Output() walletDetail = new EventEmitter<any>

  @Input() set refresh(value: boolean) {
    this.getUserWallet()
  }

  @Input() userId!: number;

  _refreshRows = signal<any>([])

  constructor(
    private activatedroute: ActivatedRoute,
    private userservice: UserService,
    private toobarService: ToolbarService,
    private dialogService: DialogService
  ) {
    super(
      [
        {field: 'currency', pipe: 'exchange'},
        {field: 'currency_name', pipe: ''},
        {field: 'type', pipe: ''},
        {field: 'user_balance.balance', pipe: ''},
        {field: 'market_price', pipe: ''},
       // {field: 'detail', pipe: 'popup', path: 'no-pop'},
      ],
      userservice,
      Api_Endpoints.user.commission.show,
    )
  }

  ngOnInit(): void {
    this.getUserWallet()
  }



  getUserWallet() {
    this.userWallet = this.userservice.getUserWallet(this.userId)
    .pipe(
      map((currencies) => {
        return Object.values(currencies.crypto).concat(Object.values(currencies.fiat), Object.values(currencies.electronic))
      }),
      )
  }

  override cellClicked(e: any) {
    if (e.colDef.headerName == "جزئیات") this.walletDetail.emit(e)
  }



}
