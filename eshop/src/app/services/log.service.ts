import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  public log(message: string): void {
    console.log(message);
  }
  constructor() {}
}
