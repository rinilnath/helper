import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reqreplacing'
})
export class ReqreplacingPipe implements PipeTransform {
  transform(value: string): string {
    return value.toString().replace(new RegExp('vol-', 'g'),"");
  }
}
