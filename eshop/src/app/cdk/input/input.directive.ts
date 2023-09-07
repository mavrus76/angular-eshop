import {
  Directive,
  OnInit,
  Input,
  Optional,
  Self,
  Renderer2,
  ElementRef,
  TemplateRef,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export type InputSize = 'large' | 'default' | 'small';

@Directive({
  selector: 'input[sh-input]',
  exportAs: 'shInput',
  host: {
    '[class.input-disabled]': 'disabled',
    '[class.input-lg]': `size === 'large'`,
    '[class.input-sm]': `size === 'small'`,
    '[attr.disabled]': 'disabled || null',
  },
})
export class InputDirective implements OnInit, OnChanges, OnDestroy {
  @Input() size: InputSize = 'default';

  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value != null && `${value}` !== 'false';
  }
  _disabled = false;
  disabled$ = new Subject<boolean>();
  private destroy$ = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    renderer: Renderer2,
    elementRef: ElementRef,
  ) {
    renderer.addClass(elementRef.nativeElement, 'sh-input');
  }

  ngOnInit() {
    if (this.ngControl) {
      this.ngControl.statusChanges
        ?.pipe(
          filter(() => this.ngControl.disabled !== null),
          takeUntil(this.destroy$),
        )
        .subscribe(() => {
          // tslint:disable-next-line:no-non-null-assertion
          this.disabled$.next(this.ngControl.disabled!);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disabled } = changes;
    if (disabled) {
      this.disabled$.next(this.disabled);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
