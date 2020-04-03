import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comareplacing'
})
export class ComareplacingPipe implements PipeTransform {

  transform(value: string): string {
    let val = value
    return val.toString().replace(new RegExp(',', 'g'),", ");
  }

}
