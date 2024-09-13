import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DashboardService } from 'src/app/core/Services/Feature Services/dashboard.service';


interface TableRowSelectEvent {
  originalEvent?: Event;
  data?: any;
  type?: string;
  index?: number;
}

@Component({
  selector: 'app-dashboard-info-container',
  templateUrl: './dashboard-info-container.component.html',
  styleUrls: ['./dashboard-info-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class DashboardInfoContainerComponent implements OnInit {

  dashboardData = signal<any>({})

  Loading: ProgressBarMode = 'determinate'

  onlineUsers: any;

  selectedOnlineUser: any

  constructor(
    private dashboardservice: DashboardService,
    private messageService: MessageService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.Loading = "indeterminate"
    this.dashboardservice.getDashboard().subscribe(res => {
      this.dashboardData.set(res)
    }).add(() => {
    this.Loading = "determinate"
    })
    this.dashboardservice.getOnlineUsers().subscribe((onlineUsers) => {
      this.onlineUsers = onlineUsers.data;
      console.log(onlineUsers)
      this.selectedOnlineUser = onlineUsers[0]
  });
  }


  onRowSelect(event: TableRowSelectEvent, op: OverlayPanel) {
    this.router.navigate([`Dashboard/users/${event.data.id}/edit/info`])
      op.hide();
  }



}
