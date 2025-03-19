import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe',
  standalone: true
})
export class BooleanPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value != 0 ? "Sí" : "No";

  }

}
