import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `
    <div class="badge" [style.background-color]="badge.color">
      {{ badge.text }}
    </div>
  `,
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() badge: any;

  constructor() {}

  ngOnInit(): void {}
}
