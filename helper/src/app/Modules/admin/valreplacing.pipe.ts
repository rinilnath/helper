import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valreplacing'
})
export class ValreplacingPipe implements PipeTransform {
  transform(value: string): string {
    value = value.replace('vol-','');
    value = value.replace(new RegExp('req-', 'g'),'');
    return value;
  }
}
