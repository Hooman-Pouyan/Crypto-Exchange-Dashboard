import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undefined',
})
export class UndefinedPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return (value.includes(null)) ? "مشخص نشده" : value;
  }

}
