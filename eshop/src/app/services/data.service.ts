import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService<T> {
  data!: T;
  getData<T>() {
    return this.data;
  }
  setData(data: T) {
    this.data = data;
  }
}
