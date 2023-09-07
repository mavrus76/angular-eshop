import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UiMenuContentComponent } from '../cdk/ui-menu/ui-menu-content.component';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-homepage',
  template: `
    <h2>{{ title }}</h2>
    <div class="d-grid mb-5">
      <h4>1. NgForObjOf</h4>
      <div *ngForObj="let prop of obj">{{ prop.name }} - {{ prop.value }}</div>
      <app-button
        class="mt-3 mb-3"
        text="Change Obj"
        color="primary"
        (click)="changeObj()"></app-button>

      <h4>2. ClickOut</h4>
      <p>Директива onClickOut применена к CartComponent</p>

      <h4>3. ui-menu</h4>
      <div>
        <app-button
          text="menu"
          color="primary"
          [menu]="menuComponent"></app-button>
      </div>
      <!-- <div class="stream__result">{{ qty$ | async | json }}</div> -->
    </div>

    <h2>UIKit</h2>
    <div class="content">
      <div class="content__buttons">
        <app-button></app-button>
        <app-button [color]="'primary'"></app-button>
        <app-button [color]="'accent'"></app-button>
        <app-button [color]="'success'"></app-button>
        <app-button [color]="'warning'"></app-button>
        <app-button [isDisabled]="true" [color]="'primary'"></app-button>
      </div>
      <div class="content__buttons">
        <app-button [buttonType]="'basic'"></app-button>
        <app-button [color]="'primary'" [buttonType]="'basic'"></app-button>
        <app-button [color]="'accent'" [buttonType]="'basic'"></app-button>
        <app-button [color]="'success'" [buttonType]="'basic'"></app-button>
        <app-button [color]="'warning'" [buttonType]="'basic'"></app-button>
        <app-button
          [isDisabled]="true"
          [color]="'primary'"
          [buttonType]="'basic'"></app-button>
      </div>
      <div class="content__buttons">
        <app-button [buttonType]="'stroked'"></app-button>
        <app-button [color]="'primary'" [buttonType]="'stroked'"></app-button>
        <app-button [color]="'accent'" [buttonType]="'stroked'"></app-button>
        <app-button [color]="'success'" [buttonType]="'stroked'"></app-button>
        <app-button [color]="'warning'" [buttonType]="'stroked'"></app-button>
        <app-button
          [isDisabled]="true"
          [color]="'primary'"
          [buttonType]="'stroked'"></app-button>
      </div>
      <div class="content__buttons">
        <app-button [color]="'primary'"></app-button>
        <app-button [color]="'primary'" [size]="'large'"></app-button>
        <app-button [color]="'primary'" [size]="'small'"></app-button>
      </div>
      <hr />
      <div class="content__dropdowns">
        <app-dropdown></app-dropdown>
        <app-dropdown [menuTriggerType]="'hover'"></app-dropdown>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .stream__result {
        padding: 20px;
        font-weight: 600;
        font-size: 32px;
      }
      .content__dropdowns,
      .content__buttons {
        display: flex;
        justify-content: space-between;
        padding: 30px 0;
      }
      .content__dropdowns {
        justify-content: space-around;
      }
    `,
  ],
})
export class HomepageComponent implements OnInit {
  public qty$: Observable<number> = this.stateService.qty$;

  public menuComponent = UiMenuContentComponent;

  public obj = {
    one: 1,
    two: 2,
    three: 3,
  };
  public title!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  changeObj() {
    this.obj.three = 333;
  }

  ngOnInit(): void {}
}
