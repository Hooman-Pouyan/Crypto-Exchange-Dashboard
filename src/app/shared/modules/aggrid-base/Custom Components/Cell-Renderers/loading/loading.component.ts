import { Component } from '@angular/core';
import {ILoadingCellRendererAngularComp, ILoadingOverlayAngularComp} from 'ag-grid-angular';
import {ILoadingCellRendererParams, ILoadingOverlayParams} from 'ag-grid-community';
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements ILoadingOverlayAngularComp {

  public params!: ILoadingOverlayParams & { loadingMessage: any, _LoadingStatus: number};

  constructor(private loader:NgxUiLoaderService) {
  }
  agInit(params: ILoadingOverlayParams & { loadingMessage: any, _LoadingStatus: number}): void {
    this.params = params;
  }

}
