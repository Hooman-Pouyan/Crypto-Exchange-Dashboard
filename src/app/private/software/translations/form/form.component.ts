import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SoftwareService} from "../../../../core/Services/Feature Services/software.service";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {DialogService} from "../../../../core/Services/Shared Services/dialog.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  translateForm!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private softwareService: SoftwareService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.groupForm()
  }

  addTranslate() {
    if (this.translateForm.valid) {
      this.translateForm.disable()
      const formData = new FormData()
      formData.append('parent_id', this.data.root ? 1 : this.data.element.id)
      formData.append('keyword', this.translateForm.get('key')?.value)
      formData.append('value[fa]', this.translateForm.get('valueFa')?.value)
      formData.append('value[en]', this.translateForm.get('valueEn')?.value)
      formData.append('value[tr]', this.translateForm.get('valueTr')?.value)
      formData.append('value[ar]', this.translateForm.get('valueAr')?.value)

      const apiUrl = Api_Endpoints.app.software.languages + this.data.softwareId + '/language_code'
      this.softwareService.addLanguageCode(apiUrl, formData).subscribe(
        (response) => {
          this.dialogService.response.set(!this.dialogService.response())
          this.translateForm.enable()
          this.dialog.closeAll()
        }
      )
    }
  }

  groupForm() {
    this.translateForm = this.formBuilder.group({
      key: ['', Validators.required],
      valueFa: ['', Validators.required],
      valueEn: ['', Validators.required],
      valueTr: ['', Validators.required],
      valueAr: ['', Validators.required],
    })
  }
}
