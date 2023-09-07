import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rates-api',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class RatesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
