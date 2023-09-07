import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flat-button',
  template: `
    <div class="wrapper">
      <button class="material-icons btn-icon">
        {{ icon }}
      </button>
      <span *ngIf="badge! > 0" class="badge">{{ badge }}</span>
    </div>
  `,
  styles: [
    `
      .wrapper {
        position: relative;
      }
      .badge {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
        display: inline-block;
        border-radius: 10px;
        padding: 3px 5px;
        color: #fff;
        background-color: purple;
      }
      .btn-icon {
        border: none;
        padding: 10px;
        color: #fff;
        background-color: transparent;
        cursor: pointer;
        transition: 0.3s ease;
      }
      .btn-icon:hover {
        opacity: 0.5;
      }
    `,
  ],
})
export class FlatButtonComponent implements OnInit {
  @Input() badge: number | null = 0;
  @Input() icon = 'star';
  constructor() {}

  ngOnInit(): void {}
}
