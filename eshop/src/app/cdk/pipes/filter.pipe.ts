import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], moreThan: number): any[] | null {
    if (items.length === 0 || moreThan >= items.length) {
      return null;
    }

    let filteredItems: any[] = [];
    filteredItems = items.filter((item, index) => {
      if (index > moreThan) return item;
    });
    return filteredItems;
  }
}
