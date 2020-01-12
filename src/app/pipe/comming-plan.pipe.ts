import { Pipe, PipeTransform } from '@angular/core';
import { Scene } from '../models/scene';

@Pipe({
  name: 'commingPlan'
})
export class CommingPlanPipe implements PipeTransform {

  transform(items: Scene[]): any {
    return items.filter(x => new Date(x.date.seconds * 1000) > new Date());
  }

}
