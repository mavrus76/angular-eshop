import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(phoneNumber: string = '', code = '7'): string | null {
    if (!phoneNumber) {
      return null;
    }

    const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${code} (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    }
    return null;
  }
}
