import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText= filterText?filterText.toLocaleString():""

    return filterText?value.filter((c:Car)=> c.description.toLocaleLowerCase()
    .indexOf(filterText)!==-1):value;

  }

}
