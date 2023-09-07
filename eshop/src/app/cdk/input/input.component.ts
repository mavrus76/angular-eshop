import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'input-field',
  exportAs: 'inputField',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="input-field-wrapper">
      <span *ngIf="shPrefix" class="input-field-affix">
        {{ shPrefix }}
      </span>
      <span class="input-wrapper">
        <ng-content></ng-content>
      </span>
      <span
        *ngIf="shAddonSuffix"
        class="input-field-addOn input-field-addOn-suffix"
      >
        <ng-template [ngTemplateOutlet]="$any(shAddonSuffix)"></ng-template>
      </span>
    </span>
  `,
  host: {
    '[class.input-addon-wrapper]': `isAddOn`,
    '[class.input-prefix-wrapper]': `isAffix`,
    '[class.input-focused]': `(focused && !isAffix) || active`,
    '[class.input-focused-affix]': `focused && isAffix`,
  },
})
export class InputFieldComponent implements OnInit, OnChanges, OnDestroy {
  @Input() shPrefix?: string | TemplateRef<void>;
  @Input() shSuffix?: string | TemplateRef<void>;
  @Input() shAddonSuffix?: string | TemplateRef<void>;
  @Input() active = false;

  isAffix = false;
  isAddOn = false;
  focused = false;

  private destroy$ = new Subject<void>();

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((focusOrigin) => {
        this.focused = !!focusOrigin;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    // завершаем subject.
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { shPrefix, shAddonSuffix } = changes;

    if (shPrefix) {
      this.isAffix = !!shPrefix;
    }
    if (shAddonSuffix) {
      this.isAddOn = !!shAddonSuffix;
    }
  }
}
