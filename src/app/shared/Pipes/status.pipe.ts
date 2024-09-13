import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {

    switch(value) {
      case "ACCEPTED":
        return "!text-green-500 !bg-green-100"
      case "PENDING":
        return "!text-orange-500 !bg-orange-100"
          case "REJECTED":
            return "!text-red-500 !bg-red-100"
            case " ":
              return "!text-slate-500 !bg-slate-100"
              default:
              return ''


    };
  }

}
