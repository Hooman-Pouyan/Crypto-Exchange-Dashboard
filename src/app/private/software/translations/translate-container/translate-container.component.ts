import {Component, effect, OnInit, signal, ViewChild} from '@angular/core';
import {SoftwareService} from "../../../../core/Services/Feature Services/software.service";
import {Api_Endpoints} from "../../../../core/Configs/Api_Endpoints";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrMessagesService} from "../../../../core/Services/Shared Services/toastr-messages.service";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "../../../../core/Services/Shared Services/dialog.service";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-translate-container',
  templateUrl: './translate-container.component.html',
  styleUrls: ['./translate-container.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TranslateContainerComponent implements OnInit {
  appId = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['label', 'valueFa', 'valueEn','valueTr','valueAr', 'add', 'edit', 'delete'];
  dataSource!: MatTableDataSource<any>;
  stringArray: any
  strings: any
  keyword='';
  disableForm = signal<boolean>(false);
  loadData = signal<boolean>(false);
  editLoading = signal(0);
  deleteLoading = signal(0);
  addLoading = signal(0);

  constructor(
    private softwareService: SoftwareService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrMessagesService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.appId = this.activatedRoute.snapshot.params['id']
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLanguageCode() {
    this.loadData.set(false)
    this.softwareService.getTranslations(Api_Endpoints.app.software.version + this.appId + '/language_code').subscribe(
      (response) => {
        if (response.length) {
          this.setStrings(response)
          this.setStringArray(response)
          this.loadData.set(true)
        }
      }, error => {
        this.loadData.set(true)
      }
    )
  }

  setStrings(response: any) {
    let tempData: any[] = []
    let counter = 1;
    const index = response.findIndex((item: any) => item.label === 'string')
    // @ts-ignore
    response[index].nodes.forEach(item => {
      tempData.push({
        counter,
        id: item.id,
        softwareId: item.software_id,
        parentId: item.parent_id,
        label: item.label,
        valueFa: item.values.length ? item.values.find((i:any)=>i.code==='fa').value : '',
        valueEn: item.values.length ? item.values.find((i:any)=>i.code==='en').value : '',
        valueTr: item.values.length ? item.values.find((i:any)=>i.code==='tr').value : '',
        valueAr: item.values.length ? item.values.find((i:any)=>i.code==='ar').value : ''
      })
      counter++;
    })
    this.strings = tempData
    this.setDataSource(tempData);
    this.setPagination()
  }

  setPagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setStringArray(response: any) {
    const index = response.findIndex((item: any) => item.label === 'string-array')
    if (response.length > 1)
      this.stringArray = response[index].nodes
  }

  showTranslates(item: any) {
    let child: any = []
    let counter = 1;

    const faIndex = item.values ? item.values.findIndex((i:any) => i.code === 'fa') : -1
    const enIndex = item.values ? item.values.findIndex((i:any) => i.code === 'en') : -1
    const trIndex = item.values ? item.values.findIndex((i:any) => i.code === 'tr') : -1
    const arIndex = item.values ? item.values.findIndex((i:any) => i.code === 'ar') : -1
    child.push({
      counter: counter,
      id: item.id,
      softwareId: item.software_id,
      parentId: item.parent_id,
      label: item.label,
      valueFa: faIndex >= 0 ? item.values[faIndex].value : '',
      valueEn: enIndex >= 0 ? item.values[enIndex].value : '',
      valueTr: trIndex >= 0 ? item.values[trIndex].value : '',
      valueAr: arIndex >= 0 ? item.values[arIndex].value : '',
    })
    counter++;

    // @ts-ignore
    item.nodes.forEach(elem => {
      // @ts-ignore
      const faIndex = elem.values.findIndex(i => i.code === 'fa')
      // @ts-ignore
      const enIndex = elem.values.findIndex(i => i.code === 'en')
      child.push({
        counter: counter,
        id: elem.id,
        softwareId: item.software_id,
        parentId: item.parent_id,
        label: elem.label,
        valueFa: elem.values[faIndex].value,
        valueEn: elem.values[enIndex].value,
        valueTr: elem.values[trIndex].value,
        valueAr: elem.values[arIndex].value
      })
      counter++
    })
    this.setDataSource(child);
  }

  setDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.setPagination()
  }

  editTranslate(element: any) {
    this.editLoading.set(element.id)
    this.disableForm.set(true)
    const apiUrl = Api_Endpoints.app.software.version + element.softwareId + '/language_code/' + element.id
    const data = new FormData()
    data.append('parent_id', element.parentId)
    data.append('keyword', element.label)
    data.append('value[fa]', element.valueFa)
    data.append('value[en]', element.valueEn)
    data.append('value[tr]', element.valueTr)
    data.append('value[ar]', element.valueAr)

    this.softwareService.updateByKey(apiUrl, data).subscribe(
      (response) => {
        this.toast.showSuccess(this.translate.instant('task done successfully'))
        this.disableForm.set(false)
        this.editLoading.set(-1)
      }, error => {
        this.editLoading.set(-1)
        this.disableForm.set(false)
      }
    )
  }

  resetStrings() {
    this.setDataSource(this.strings)
    this.keyword=''
  }

  removeTranslate(element: any, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('Are you sure that you want to proceed?'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteLoading.set(element.id)
        this.disableForm.set(true)
        const apiUrl = Api_Endpoints.app.software.version + element.softwareId + '/language_code/' + element.id
        this.softwareService.deleteData(apiUrl).subscribe(
          (response) => {
            this.dialogService.response.set(!this.dialogService.response())
            this.toast.showSuccess(this.translate.instant('task done successfully'))
            this.disableForm.set(false)
            this.deleteLoading.set(-1)
          }, error => {
            this.disableForm.set(false)
            this.deleteLoading.set(-1)
          }
        )
      }
    });
  }


  addTranslate(element: any, root = false) {
    const data = {
      element,
      root,
      softwareId: this.appId
    }
    this.dialogService.openDialog(data, FormComponent)
  }

  onCloseDialog = effect(() => {
    if (this.dialogService.response() !== null) {
      this.getLanguageCode()
    }
  }, {allowSignalWrites: true})
}
