import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import { TranslateService } from '@ngx-translate/core';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-pagination-container',
  templateUrl: './pagination-container.component.html',
  styleUrls: ['./pagination-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationContainerComponent implements OnChanges {
  @ViewChild('paginator') paginator!: MatPaginator;

  @Input() length = 50;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() hidePageSize = false;
  @Input() searchField = false;
  @Input() pageSizeOptions? = [5, 10, 25];

  @Output() pageChange = new EventEmitter<PageEvent>();

  showFirstLastButtons = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchField']) {
      if (changes['searchField'].currentValue !== changes['searchField'].firstChange && this.paginator)
        this.paginator.firstPage()
    }
  }

  handlePageEvent(e: any) {
    this.pageChange.emit(e);
  }

  constructor(private translate: TranslateService) {
  }

  ngOnInit(){
  }


}
