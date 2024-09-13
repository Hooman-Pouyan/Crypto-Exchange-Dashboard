import {ChangeDetectionStrategy, Component, computed, ElementRef, signal, ViewChild} from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Observable,
  startWith,
  switchMap,
  tap
} from 'rxjs';
import {Api_Endpoints} from 'src/app/core/Configs/Api_Endpoints';
import {SupportService} from 'src/app/core/Services/Feature Services/support.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  searchField = false;
  tasks!: Observable<any>
  currentTab = signal<number>(1)
  loading = signal<boolean>(false)

  totalRecord = signal<number>(10)

  isArchiveActivated = signal<number>(0)


  @ViewChild("search", {static: true, read: ElementRef}) searchParams!: ElementRef;

  searchedQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentPage = signal<number>(1)
  queryParams = signal({
    search: '',
    filter_archive: computed(() => window.location.href.includes("archive") ? 1 : 0)(),
    page: 1,
    row_limit: 15
  })


  constructor(private supportservice: SupportService) {

  }

  ngOnInit(): void {
    this.search()
  }

  fetchData(searchString: string = '', type: string): Observable<any> {
    this.loading.set(true)
    if (type === 'searchField' && this.searchParams.nativeElement.value) {
      this.queryParams.mutate((x) => {
        x.page = 0
      })
      this.searchField = true;
    } else {
      this.searchField = false
    }

    return this.supportservice.fetchAll(Api_Endpoints.support.task.list,
      {...this.queryParams(), search: searchString}
    ).pipe(
      tap((res) => this.totalRecord.set(res.total_record)),
    )
  }

  search() {
    this.tasks = fromEvent(this.searchParams.nativeElement, 'input').pipe(
      startWith({target: {value: ''}}),
      distinctUntilChanged(),
      debounceTime(400),
      switchMap((data: any) => this.fetchData(data.target.value, 'searchField'))
    )
  }

  pageChange(e: any) {
    const nextPage = e.pageIndex + 1;
    this.currentPage.set(nextPage)
    this.queryParams.mutate(filterObject => {
      filterObject.page = this.currentPage()
    });
    this.search()
  }

  startFromZero(arr: any[]) {
    var newArr = [];
    var count = 0;

    for (var i in arr) {
      newArr[count++] = arr[i];
    }

    return newArr;
  }
}
