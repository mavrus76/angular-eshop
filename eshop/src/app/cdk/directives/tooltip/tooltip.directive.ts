import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { UiTooltipComponent } from '../../ui-tooltip/ui-tooltip.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('tooltip') content!: string | TemplateRef<any> | Type<any>;
  private componentRef!: ComponentRef<UiTooltipComponent> | null;

  @HostListener('mouseenter') mouseenter() {
    if (this.componentRef) {
      return;
    }

    const factory =
      this.componentResolver.resolveComponentFactory(UiTooltipComponent);
    const injector = Injector.create({
      providers: [
        {
          provide: 'tooltipConfig',
          useValue: {
            host: this.element.nativeElement,
          },
        },
      ],
    });
    this.componentRef = this.vcr.createComponent(
      factory,
      0,
      injector,
      this.createTooltipContent()
    );
  }

  private destroyTooltip() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = null;
  }

  @HostListener('mouseout') mouseout() {
    this.destroyTooltip();
  }

  private createTooltipContent(): any {
    if (typeof this.content === 'string') {
      // console.log(this.content);
      const elementText = this.renderer.createText(this.content);
      return [[elementText]];
    }

    if (this.content instanceof TemplateRef) {
      const viewRef = this.content.createEmbeddedView({});
      return [viewRef.rootNodes];
    }

    const factory = this.componentResolver.resolveComponentFactory(
      this.content
    );
    const viewComponentRef = factory.create(this.injector);
    return [[viewComponentRef.location.nativeElement]];
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private vcr: ViewContainerRef,
    private componentResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnDestroy() {
    this.destroyTooltip();
  }
}
