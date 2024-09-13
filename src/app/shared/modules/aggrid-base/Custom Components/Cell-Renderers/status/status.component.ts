import {ChangeDetectionStrategy, Component, OnInit, Signal, signal} from '@angular/core';
import {ICellRendererParams} from "ag-grid-community";
import {TranslateService} from "@ngx-translate/core";
import { UserService } from 'src/app/core/Services/Feature Services/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent {
  status = '';
  mainStatus = signal<string>('');
  statusClass = signal<string>('');
  columnId = signal<any>('');

  loading = signal<boolean>(false);

  params: any;

  isBlocked = signal<boolean>(false)

  constructor(
    private translate: TranslateService,
    private userservice: UserService
  ) {
  }

  agInit(params: ICellRendererParams<any, number>): void {
    this.params = params;
    this.columnId.set(params.column?.getColId())
    this.isBlocked.set(params.data.blocked_at)
    if (this.columnId() === 'status')
      this.status = this.translate.instant(params.data.status)
    else if (this.columnId() === 'identity_status')
      this.status = this.checkStatus(params.data.identity_status)
    else if (this.columnId() === 'blocked_at')
      this.status = this.checkBlock(params.data.blocked_at)
    this.mainStatus.set(this.status ? 'status' : '')


    let statusLabel = params.data[this.columnId() ? this.columnId() : '']
    switch (statusLabel) {
      case "COMPLETED":
      case "ACCEPTED":
      case null:
      case true:
        this.statusClass.set('success')
        break;
      case "FAILED":
      case "CANCELED":
      case "REJECTED":
      case "RETURNED_MONEY":
      case false:
        this.statusClass.set('danger')
        break;
      case "PENDING":
      case "IN_PROCESS":
      case "RETURNED_MODIFY":
      case "RELEASE":
      case "PART_DEAL":
      case "AWAITING_CONFIRMATION":
        this.statusClass.set('warning')
        break;
    }
  }

  checkStatus(status: boolean) {
    if (status)
      return 'احراز شده'
    else
      return 'احراز نشده';
  }

  checkBlock(status: any) {
    if (status === null) {
      this.statusClass.set('success')
      return 'فعال'
    }
    else {
      this.statusClass.set('warning')
      return 'بلاک شده';
    }
  }


  unblock(){
    this.loading.set(true)
    if (this.columnId() !== "blocked_at") return
    this.userservice.unblockUser(this.params.data.id).subscribe(res => {
      if (res['result'])  {
            this.statusClass.set('success')
            this.status = 'فعال'
            this.isBlocked.set(false)
          }
      }).add(() => {
        this.loading.set(false)
      })
  }

  block(){
    this.loading.set(true)
    if (this.columnId() !== "blocked_at") return
    this.userservice.blockUser(this.params.data.id).subscribe(res => {
      if (res['result']) {
        this.statusClass.set('warning')
        this.status = 'بلاک شده'
        this.isBlocked.set(true)

      }
    }).add(() => {
      this.loading.set(false)
    })
  }


}
