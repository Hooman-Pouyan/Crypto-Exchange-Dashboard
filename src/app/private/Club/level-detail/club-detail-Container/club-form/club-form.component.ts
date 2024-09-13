import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MatDialog, DialogService]
})
export class ClubFormComponent {

  constructor(
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogService:DialogService
  ) {
    console.log(this.data.data)
  }

  clubForm: FormGroup = this.fb.group({
    poan_from: new FormControl(this.data.data.id ? this.data.data.poan_form : '' , [Validators.required]),
    poan_to: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    fee_percent_discount: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    max_deposit_day: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    max_deposit_month: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    max_withdraw_day: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    max_withdraw_month: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    commission_percent: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    status: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required]),
    descriptions: new FormControl(this.data.poan_form ? this.data.poan_form : '', [Validators.required])

  })

  onSubmit(){
    console.log(this.clubForm.value)
  }

}
