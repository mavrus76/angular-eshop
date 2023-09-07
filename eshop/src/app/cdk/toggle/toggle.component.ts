import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterContentInit,
  ContentChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { map, mapTo, merge, Observable, tap } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

export interface Toggle {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-toggle',
  template: `
    <div class="filter">
      <div *ngFor="let toggle of toggles">
        <app-button [text]="toggle.label" [isActive]="toggle === selected">
          <!-- (click)="selectedChanged(toggle)" -->
        </app-button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .filter {
        display: flex;
        margin-bottom: 30px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
  @Input() toggles: Array<Toggle> = [];
  @Input() selected!: Toggle | ButtonComponent;
  @Output() toggleChanged = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  @ContentChildren(ButtonComponent)
  public filters!: QueryList<ButtonComponent>;

  ngOnInit(): void {}

  selectedChanged(item: any) {
    // TODO:
    this.selected = item;
    this.toggleChanged.emit(item);
  }

  ngAfterContentInit() {
    const clicks$: Array<Observable<ButtonComponent>> = this.filters.map(
      filter => filter.click$.pipe(map(() => filter))
    );

    merge(...clicks$)
      .pipe(tap(c => console.log(c)))
      .subscribe(filter => this.selectedChanged(filter));
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
