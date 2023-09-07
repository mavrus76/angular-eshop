import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-option',
  template: `
    <div
      class="card__color-option"
      [ngStyle]="{ 'background-color': color, 'border-color': borderColor }"
    ></div>
  `,
  styleUrls: ['./color-option.component.scss'],
})
export class ColorOptionComponent implements OnInit {
  @Input() color = 'black';
  constructor() {}

  ngOnInit(): void {}

  get borderColor(): string {
    return this.color === 'white' ? 'gray' : this.color;
  }
}
