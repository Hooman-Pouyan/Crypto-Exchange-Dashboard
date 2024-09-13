import {Component, signal} from '@angular/core';
import {ICellRendererParams} from "ag-grid-community";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements ICellRendererAngularComp {

  params = signal<any>({})

  buttonTitle = 'edit';
  deleteBbuttonTitle = 'delete';
  hasDeleteButton = false;

  constructor(
      private translate: TranslateService,
  ) {
    this.buttonTitle = this.translate.instant(this.buttonTitle)
    this.deleteBbuttonTitle = this.translate.instant(this.deleteBbuttonTitle)
    // this.setDeleteButton()
  }

  agInit(params: any): void {
    this.params.set(params)
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }



}
