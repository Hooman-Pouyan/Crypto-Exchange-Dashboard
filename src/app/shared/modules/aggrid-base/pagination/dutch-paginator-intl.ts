import {MatPaginatorIntl} from "@angular/material/paginator";
import {TranslateService} from "@ngx-translate/core";

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 از ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} از ${length}`;
}

export function getDutchPaginatorIntl() {
  let translte!:TranslateService
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'ایتم در صفحه:';
  paginatorIntl.nextPageLabel = 'بعدی';
  paginatorIntl.previousPageLabel = 'قبلی';
  paginatorIntl.firstPageLabel = 'اولین';
  paginatorIntl.lastPageLabel = 'آخرین';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}
