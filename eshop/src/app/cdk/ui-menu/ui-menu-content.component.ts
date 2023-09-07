import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-menu-content',
  template: `
    <li>ui-menu-item1!</li>
    <li>ui-menu-item2!</li>
    <li>ui-menu-item3!</li>
  `,
  styles: [],
})
export class UiMenuContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
