import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  template: `
    <button class="button" [ngClass]="{ 'button--active': active }">
      <svg
        width="48"
        height="40"
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="47" height="39" rx="9.5" fill="white" />
        <path
          d="M24 29.35L22.55 28.03C17.4 23.36 14 20.28 14 16.5C14 13.42 16.42 11 19.5 11C21.24 11 22.91 11.81 24 13.09C25.09 11.81 26.76 11 28.5 11C31.58 11 34 13.42 34 16.5C34 20.28 30.6 23.36 25.45 28.04L24 29.35Z"
          fill="#A3A3A3" />
        <rect
          x="0.5"
          y="0.5"
          width="47"
          height="39"
          rx="9.5"
          stroke="#DDDDDD" />
      </svg>
    </button>
  `,
  styles: [
    `
      .button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
      .button svg path {
        transition: all 0.3s ease;
      }
      .button:hover svg path,
      .button--active svg path {
        fill: red;
      }
    `,
  ],
})
export class ButtonIconComponent implements OnInit {
  @Input() active = false;
  constructor() {}

  ngOnInit(): void {}
}
