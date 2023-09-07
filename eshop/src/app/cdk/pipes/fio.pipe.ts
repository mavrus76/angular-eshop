import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFio' })
export class AppFioPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value) {
      console.log(value);
      return value?.firstName + ' ' + value?.lastName?.charAt(0) + '.';
    }
    return '';
  }
}
