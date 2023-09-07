import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <ul class="menu">
      <li class="item">Item1 dropdownmenu</li>
      <li class="item">Item2 dropdownmenu</li>
      <li class="item">Item3 dropdownmenu</li>
    </ul>
  `,
  styles: [
    `
      .menu {
        margin: 0;
        padding: 0 15px;
        list-style: none;
        box-shadow: 0 6px 6px 1px #e5e5e5;
      }
      .item {
        padding: 10px 0;
      }
    `,
  ],
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
