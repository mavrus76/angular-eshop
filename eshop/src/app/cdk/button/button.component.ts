import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

type buttonColors = 'default' | 'primary' | 'accent' | 'success' | 'warning';
type buttonTypes = 'basic' | 'flat' | 'stroked';
type buttonSizes = 'default' | 'large' | 'small';

@Component({
  selector: 'app-button',
  template: `
    <button
      class="button-base"
      [ngClass]="[buttonType, innerColor]"
      [class.large]="size === 'large'"
      [class.small]="size === 'small'"
      [class.button-active]="isActive"
      [class.button-disabled]="isDisabled"
      [attr.disabled]="isDisabled ? '' : null">
      {{ text }}
      <span class="material-icons btn-icon">{{ icon }}</span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() text = 'Button';
  @Input() icon = '';
  @Input() color: buttonColors = 'default';
  @Input() size: buttonSizes = 'default';
  @Input() buttonType: buttonTypes = 'flat';
  @Input() isActive = false;
  @Input() isDisabled = false;

  innerColor: buttonColors = 'default';
  innerSize: buttonSizes = 'default';

  public click$: Observable<Event> = fromEvent(
    this.host.nativeElement,
    'click'
  );

  constructor(private host: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { color, size } = changes;
    if (color && color.currentValue) {
      this.innerColor = color.currentValue;
    }

    if (size && size.currentValue) {
      this.innerSize = size.currentValue;
    }
  }

  ngOnInit(): void {}
}
