import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-api',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class PriceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
