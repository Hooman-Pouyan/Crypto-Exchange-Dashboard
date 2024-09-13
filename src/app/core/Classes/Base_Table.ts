import { signal, OnInit, computed } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { ReportService } from "../Services/Feature Services/report.service";
import { ExchangeService } from "../Services/Feature Services/exchange.service";
import { UserService } from "../Services/Feature Services/user.service";
import { ClubService } from "../Services/Feature Services/club.service";
import {SoftwareService} from "../Services/Feature Services/software.service";
import { PriceReferenceService } from "../Services/Feature Services/price-reference.service";
import { SupportService } from "../Services/Feature Services/support.service";
export class BaseTable {

  tableSource!: Observable<any>;

  IColDefs!: any;
  ApiEndpoint!: string;
  payload: any

  totalData = signal<number>(1)
  pageSize = signal<number>(1);
  currentPage = signal<number>(1)
  page = computed(() => this.currentPage())

  queryParams = signal<any>({
    page: 1
  })

  refreshMode = signal<number>(1)

  constructor(IColS: any,private myService: ReportService | ExchangeService | UserService | SoftwareService | ClubService | PriceReferenceService | SupportService, ApiEndpoint: string, payload?: any) {
    this.IColDefs = IColS
    this.ApiEndpoint = ApiEndpoint
    this.payload = payload
    this.fetchData();
  }


  fetchData(): void {
    this.refreshMode.set(1)
    this.tableSource = this.myService.fetchAll(this.ApiEndpoint,this.queryParams(),this.payload).pipe(
      tap(res => {
        this.totalData.set(res.total_record)
        this.pageSize.set(Math.ceil(res.total_record / 10))
        if (!res) this.refreshMode.set(0)
        else this.refreshMode.set(2)
      }),
      map(res => {
        return res.data ? res.data : res
      }));
  }



  pageChange(e: any) {
    const nextPage = e.pageIndex + 1;
    this.currentPage.set(nextPage)
    this.queryParams.mutate(filterObject => {
      filterObject.page = nextPage
    });
    this.fetchData();
  }

  cellClicked(e: any) {
  }

}
