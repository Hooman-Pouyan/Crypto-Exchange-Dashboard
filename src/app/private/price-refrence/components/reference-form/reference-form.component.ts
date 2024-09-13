import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PriceReferenceService } from 'src/app/core/Services/Feature Services/price-reference.service';
import { DialogService } from 'src/app/core/Services/Shared Services/dialog.service';
import { ToastrMessagesService } from 'src/app/core/Services/Shared Services/toastr-messages.service';

@Component({
  selector: 'app-reference-form',
  templateUrl: './reference-form.component.html',
  styleUrls: ['./reference-form.component.scss'],
  providers: [DialogService]
})
export class ReferenceFormComponent implements OnInit  {

  constructor(
    private fb:FormBuilder,
    private referencepriceService:  PriceReferenceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toast:ToastrMessagesService) {}

  referenceForm!: FormGroup;

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.referenceForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(){
    this.referencepriceService.addReference(this.referenceForm.value).subscribe(
      response =>
      {
        next: this.toast.showSuccess("مرجع قیمت با موفقیت ایجاد شد")
      }
    )

  }


}
