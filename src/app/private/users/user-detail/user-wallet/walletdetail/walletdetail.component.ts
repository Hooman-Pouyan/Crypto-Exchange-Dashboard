import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-walletdetail',
  templateUrl: './walletdetail.component.html',
  styleUrls: ['./walletdetail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class WalletdetailComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogService: DialogService
  ){}

  userCurrencyDetail = {}
  length!: number;

  ngOnInit() {
    console.log(this.data.data)
      this.userCurrencyDetail = this.data.data
  }
}
