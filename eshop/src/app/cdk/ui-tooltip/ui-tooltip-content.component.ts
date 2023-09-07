import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-tooltip-content',
  template: ` <h3>ui-tooltip-content works!</h3> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class UiTooltipContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
