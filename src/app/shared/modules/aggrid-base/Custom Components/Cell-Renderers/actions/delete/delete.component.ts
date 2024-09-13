import {Component, signal} from '@angular/core';
import {ICellRendererParams} from "ag-grid-community";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastrMessagesService} from "../../../../../../../core/Services/Shared Services/toastr-messages.service";
import {UserService} from "../../../../../../../core/Services/Feature Services/user.service";
import {TranslateService} from "@ngx-translate/core";
import {ActionService} from "../../../../../../../core/Services/Shared Services/action.service";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {BaseTable} from "../../../../../../../core/Classes/Base_Table";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DeleteComponent implements ICellRendererAngularComp {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toast: ToastrMessagesService,
    private translate: TranslateService,
    private userService: UserService,
    private actionService: ActionService
  ) {
  }

  params = signal<any>({});

  agInit(params?: ICellRendererParams<any, number>): void {
    this.params.set(params)
  }

  confirm(event: Event) {
    console.log(this.params())
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('Are you sure that you want to proceed?'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.actionService.deleteData(this.params().data.id ? this.params().data.id : this.params().data.session_id, this.params().path).subscribe(
          (response) => {
            this.actionService._refreshData.set(!this.actionService._refreshData())
            this.toast.showSuccess(this.translate.instant('task done successfully'))
          }
        )
      },
      reject: () => {
      }
    });
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}
