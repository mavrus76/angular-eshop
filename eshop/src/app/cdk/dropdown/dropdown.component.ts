import { Component, OnInit, Input, HostListener } from '@angular/core';

export type menuTriggerTypes = 'click' | 'hover';

@Component({
  selector: 'app-dropdown',
  template: `
    <div class="dropdown">
      <div class="button-wrapper">
        <app-button
          [color]="'primary'"
          [text]="menuTriggerType === 'hover' ? 'Hover me' : 'Click me'"
          [isActive]="isOpen"
          (click)="changeOpenedState()"
        ></app-button>
      </div>
      <div class="menu-wrapper" *ngIf="isOpen">
        <app-menu></app-menu>
      </div>
    </div>
  `,
  styles: [
    `
      .dropdown {
        width: 206px;
      }
      .button-wrapper {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class DropdownComponent implements OnInit {
  @Input() isOpen = false;
  @Input() menuTriggerType: menuTriggerTypes = 'click';
  constructor() {}

  ngOnInit(): void {}

  changeOpenedState() {
    if (this.menuTriggerType === 'click') {
      this.isOpen = !this.isOpen;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.menuTriggerType === 'hover') {
      this.isOpen = true;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.menuTriggerType === 'hover') {
      this.isOpen = false;
    }
  }
}
