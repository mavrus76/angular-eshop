import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TooltipContainerDirective } from '../directives/tooltip/tooltip-container.directive';

@Component({
  selector: 'app-ui-tooltip',
  template: `
    <div class="tooltip-container" [style.top.px]="top">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .tooltip-container {
        position: absolute;
        display: inline-block;
        border: 1px solid #d2d2d2;
        border-radius: 4px;
        padding: 8px;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class UiTooltipComponent implements OnInit, AfterViewInit {
  public top!: number;

  @ViewChild(TooltipContainerDirective, { read: ElementRef })
  private tooltipContainer!: ElementRef;

  constructor(
    @Inject('tooltipConfig') private config: { host: HTMLElement },
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const { top } = this.config.host.getBoundingClientRect();
    const { height } =
      this.tooltipContainer.nativeElement.getBoundingClientRect();
    this.top = top - height;
    this.cdr.detectChanges();
  }
}
