import { Pipe, PipeTransform } from '@angular/core';
import { Scene } from '../models/scene';

@Pipe({
  name: 'todo'
})
export class TodoPipe implements PipeTransform {

  transform(items: Scene[], col: string, value: boolean): any {
    if(items == null)return;
    return items.filter(x => x[col]==value);
  }

}
