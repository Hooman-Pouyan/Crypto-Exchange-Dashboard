import { Component, Type, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICellRendererParams } from 'ag-grid-community';
import { DialogService } from 'src/app/core/Services/Shared Services/dialog.service';
import { PriceReferenceService } from 'src/app/core/Services/Feature Services/price-reference.service';
import { PopupComponent } from './popup/popup.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  params = signal<any>({});
  editPath = signal<string>('');

  data$!: Observable<any>

  infoComponent = PopupComponent;

  constructor(
    private router: Router,
    private translate:TranslateService,
    private dialogService:DialogService,
    private priceReferenceService:PriceReferenceService
  ) {
  }

  agInit(params: ICellRendererParams<any, number>): void {
    this.editPath.set(this.params().path + params.data.id)
    this.params.set(params)
  }

  goToDetail() {

    if (this.params().path !== "no-pop") {

    this.fetchData()

    if (!this.params().dialog) {
      this.openDialog(this.data$, PopupComponent)
    }
  }

  }

  fetchData(){
    this.data$ = this.priceReferenceService.fetchAll(this.params().path + this.params().data.id, {})
  }

  openDialog<T>(Data: any, componentType: Type<T>): void {
    this.dialogService.openDialog(Data, componentType)
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

}
