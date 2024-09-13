import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SoftwareService} from "../../../../core/Services/Feature Services/software.service";
import {environment} from "../../../../../environments/environment";
import {ToastrMessagesService} from "../../../../core/Services/Shared Services/toastr-messages.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  form!: FormGroup
  file: any;
  fileUrl = environment.fileUrl
  editVersionFile = ''
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private matDialog: MatDialog,
    private softwareService: SoftwareService,
    private toast: ToastrMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.groupForm(this.data.data)
    if (this.data.elementId) {
      this.editVersionFile = this.fileUrl + this.data.data.file.id
      this.getValues()
    }
  }

  groupForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      name: [data?.name],
      file: [],
      code: [data?.code],
      force: [data?.force ? data.force : false],
      faValues: this.formBuilder.array([]),
      enValues: this.formBuilder.array([]),
      arValues: this.formBuilder.array([]),
      trValues: this.formBuilder.array([]),
    })
  }

  get values(): FormArray {
    return this.form.get("faValues") as FormArray
  }

  newValue(item: any): FormGroup {
    return this.formBuilder.group({
      name: item.name,
      language_code: item.language_code
    })
  }

  addValues(object: any[]) {
    object.forEach(item => {
      this.values.push(this.newValue({name: item?.description, language_code: 'fa'}))
    })
    this.cdr.detectChanges()
  }

  get enValues(): FormArray {
    return this.form.get("enValues") as FormArray
  }

  addEnValues(object: any[]) {
    object.forEach(item => {
      this.enValues.push(this.newValue({name: item?.description, language_code: 'fa'}))
      this.cdr.detectChanges()
    })
  }

  get trValues(): FormArray {
    return this.form.get("trValues") as FormArray
  }

  addTrValues(object: any[]) {
    object.forEach(item => {
      this.trValues.push(this.newValue({name: item?.description, language_code: 'tr'}))
      this.cdr.detectChanges()
    })
  }

  get arValues(): FormArray {
    return this.form.get("arValues") as FormArray
  }

  addArValues(object: any[]) {
    object.forEach(item => {
      this.arValues.push(this.newValue({name: item?.description, language_code: 'ar'}))
      this.cdr.detectChanges()
    })
  }

  closeDialog() {
    this.matDialog.closeAll()
  }

  submitForm() {
    this.changeLoading()
    this.form.disable()
    const formData = new FormData()

    const faValues: any[] = this.form.get('faValues')?.value
    if (faValues.length) {
      faValues.forEach(item => {
        formData.append('value[fa][]', item.name);
      })
    } else {
      // @ts-ignore
      formData.append('value[fa][]', null);
    }

    const enValues: any[] = this.form.get('enValues')?.value
    if (enValues.length) {
      enValues.forEach(item => {
        formData.append('value[en][]', item.name);
      })
    } else {
      // @ts-ignore
      formData.append('value[en][]', null)
    }

    const trValues: any[] = this.form.get('trValues')?.value
    if (trValues.length) {
      trValues.forEach(item => {
        formData.append('value[tr][]', item.name);
      })
    } else {
      // @ts-ignore
      formData.append('value[tr][]', null)
    }

    const arValues: any[] = this.form.get('arValues')?.value
    if (arValues.length) {
      arValues.forEach(item => {
        formData.append('value[ar][]', item.name);
      })
    } else {
      // @ts-ignore
      formData.append('value[ar][]', null)
    }

    formData.append('name', this.form.get('name')?.value)
    formData.append('code', this.form.get('code')?.value)
    formData.append('force', (this.form.get('force')?.value ? 1 : 0).toString())
    if (this.file)
      formData.append('file', this.file)

    console.log(this.data)
    let apiUrl = this.data?.elementId ? Api_Endpoints.app.software.version + this.data.id + '/version/' + this.data.elementId : Api_Endpoints.app.software.version + this.data.id + '/version'
    this.softwareService.addSoftware(apiUrl, formData).subscribe(
      (response) => {
        this.changeLoading()
        this.form.enable()
        this.matDialog.closeAll()
        this.toast.showSuccess(this.translate.instant('task done successfully'))
      }, error => {
        this.changeLoading()
        this.form.enable()
      }
    )
  }

  setFile($event: any) {
    let files: FileList = $event.target.files;
    this.file = files[0]
  }

  getValues() {
    this.softwareService.fetchById(Api_Endpoints.app.software.version + this.data.id + '/' + 'version/' + this.data.data.id).subscribe(
      (response) => {
        Object.keys(response).forEach(item => {
          if (item === 'fa')
            this.addValues(response[item])
          else if (item === 'en')
            this.addEnValues(response[item])
          else if (item === 'ar')
            this.addArValues(response[item])
          else if (item === 'tr')
            this.addTrValues(response[item])
        })
      }
    )
  }

  changeLoading() {
    this.loading = !this.loading
  }
}
