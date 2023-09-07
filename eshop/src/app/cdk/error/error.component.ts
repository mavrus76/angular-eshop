import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <p class="error">
      {{ message }}
    </p>
  `,
  styles: [
    `
      .error {
        padding: 4px 0;
        color: #ff0000;
      }
    `,
  ],
})
export class ErrorComponent implements OnInit {
  @Input() message: string = '';
  constructor() {}

  ngOnInit(): void {}
}
