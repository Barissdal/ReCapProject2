import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(value: Color[], filterText: string): Color[] {
    filterText= filterText?filterText.toLocaleString():""

    return filterText?value.filter((col:Color)=> col.name.toLocaleLowerCase()
    .indexOf(filterText)!==-1):value;

  }

}
