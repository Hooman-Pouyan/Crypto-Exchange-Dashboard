import {Component, signal} from '@angular/core';
import {ICellRendererParams} from "ag-grid-community";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements ICellRendererAngularComp {
  params = signal<any>({});
  editPath = '';

  constructor(
    private router: Router
  ) {
  }

  agInit(params: ICellRendererParams<any, number>): void {
    this.editPath = window.location.pathname + '/' + params.data.id + '/edit'
    this.params.set(params)
  }

  editRoute() {
    if (!this.params().dialog)
      this.router.navigate([this.editPath]).then(r => {
      })
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}
