import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valreplacing'
})
export class ValreplacingPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('vol-','').replace('req-','');
  }
}
