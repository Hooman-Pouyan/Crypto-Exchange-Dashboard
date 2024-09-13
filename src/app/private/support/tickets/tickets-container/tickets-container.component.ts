import {Component, signal} from '@angular/core';
import {Router} from '@angular/router';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {SupportService} from 'src/app/core/Services/Feature Services/support.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-tickets-container',
  templateUrl: './tickets-container.component.html',
  styleUrls: ['./tickets-container.component.scss']
})
export class TicketsContainerComponent {
  dataLoaded = signal<boolean>(false);
  allOpenTickets = signal<any>([])
  myTickets = signal<any>([])
  closedTickets = signal<any>([])
  currentTab = signal<number>(2)
  tabIndex = 2
  fileUrl = environment.fileUrl;
  totalRecord = 0;
  queryParams: any = {
    page: 0
  }

  constructor(
    private supportservice: SupportService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.fetchData(2)
  }

  changeTab(tabIndex: any) {
    if (this.currentTab() !== tabIndex) {
      this.currentTab.set(tabIndex.index)
      this.fetchData(this.currentTab())
    }
  }


  pageChange($event: any) {
    this.queryParams.page = $event.pageIndex
    this.fetchData(this.currentTab())
  }

  fetchData(tabIndex: number) {
    this.dataLoaded.set(false);
    if (tabIndex === 0) {
      this.queryParams.type = 'ARCHIVED'
    } else if (tabIndex === 1) {
      this.queryParams.my_ticket = true
    }
    this.supportservice.fetchAll(Api_Endpoints.support.ticket.list, this.queryParams).subscribe(res => {
      if (tabIndex === 2) {
        this.allOpenTickets.set(res.data)
      } else if (tabIndex === 0) {
        this.closedTickets.set(res.data)
      } else if (tabIndex === 1) {
        this.myTickets.set(res.data)
      }
      this.totalRecord = res.total_record
      this.dataLoaded.set(true)
    })
  }
}
