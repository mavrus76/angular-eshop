import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[onClickOut]',
})
export class OnClickOutDirective {
  get host() {
    return this.elRef.nativeElement;
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClickOut = new EventEmitter<void>();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.host.contains(target);
    if (!clickedInside) {
      this.onClickOut.emit();
    }
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}
