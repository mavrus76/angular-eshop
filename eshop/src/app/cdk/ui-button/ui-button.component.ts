import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[ui-button]',
  template: `
    <div class="button__content">
      <span><ng-content></ng-content></span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class UiButtonComponent implements OnInit, OnChanges {
  @Input() buttonType: 'primary' | 'secondary' | 'tertiary' = 'tertiary';

  get host() {
    return this.elRef.nativeElement;
  }

  public initButton(): void {
    this.renderer.addClass(this.host, 'ui-button');
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.initButton();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['buttonType']?.currentValue) {
      if (changes?.['buttonType']?.previousValue) {
        this.renderer.removeClass(
          this.host,
          changes['buttonType'].previousValue
        );
      }
      this.renderer.addClass(this.host, changes['buttonType'].currentValue);
    }
  }
}
