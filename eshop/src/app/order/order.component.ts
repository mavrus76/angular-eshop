import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  template: `
    <div>
      <div class="section">
        <h2 class="title">Шаблонная форма</h2>
        <app-registration></app-registration>
      </div>
      <div class="section">
        <h2 class="title">Реактивная форма</h2>
        <app-checkout></app-checkout>
      </div>
    </div>
  `,
  styles: [
    `
      .section {
        margin-bottom: 50px;
      }
      .title {
        color: #0000ff;
      }
    `,
  ],
})
export class OrderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
