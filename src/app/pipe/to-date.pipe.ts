import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(ts: any): Date {
    let date:Date = new Date(ts.seconds * 1000);
    return date;
  }

}
