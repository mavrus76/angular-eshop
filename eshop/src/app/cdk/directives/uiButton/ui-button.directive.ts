import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[uiButton]',
})
export class UiButtonDirective implements AfterViewInit, OnChanges {
  private textContent!: string;
  @Input() uiButton: 'primary' | 'secondary' | 'tertiary' = 'tertiary';

  get host() {
    return this.elRef.nativeElement;
  }

  listenChanges() {
    this.renderer.listen(this.host, 'click', (e: Event) => {
      console.log(e);
    });
  }

  private initButton(): void {
    this.textContent = this.host.textContent;
    this.host.textContent = ``;
    const textElement = this.renderer.createText(this.textContent);
    const spanElement = this.renderer.createElement('span');
    this.renderer.appendChild(spanElement, textElement);

    const buttonContent = this.renderer.createElement('div');
    this.renderer.addClass(buttonContent, 'button__content');
    this.renderer.appendChild(buttonContent, spanElement);

    this.renderer.appendChild(this.host, buttonContent);
    this.renderer.addClass(this.host, 'ui-button');
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.listenChanges();
  }

  ngAfterViewInit() {
    this.initButton();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.uiButton?.currentValue) {
      if (changes?.uiButton?.previousValue) {
        this.renderer.removeClass(this.host, changes.uiButton.previousValue);
      }
      this.renderer.addClass(this.host, changes.uiButton.currentValue);
    }
  }
}
