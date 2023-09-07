import { TmplAstBoundEvent } from '@angular/compiler';
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
import { UiMenuComponent } from '../../ui-menu/ui-menu.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[menu]',
})
export class MenuDirective implements OnDestroy {
  @Input('menu') content!: string | TemplateRef<any> | Type<any>;

  private componentRef!: ComponentRef<UiMenuComponent> | null;

  @HostListener('click') click() {
    if (this.componentRef) {
      this.destroyMenu();
    } else {
      const factory =
        this.componentResolver.resolveComponentFactory(UiMenuComponent);
      const injector = Injector.create({
        providers: [
          {
            provide: 'menuConfig',
            useValue: {
              host: this.elRef.nativeElement,
            },
          },
        ],
      });
      this.componentRef = this.vcr.createComponent(
        factory,
        0,
        injector,
        this.createMenuContent()
      );
    }
  }

  private destroyMenu() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = null;
  }

  private createMenuContent(): any {
    if (typeof this.content === 'string') {
      console.log(this.content);
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

  get host() {
    return this.elRef.nativeElement;
  }

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private vcr: ViewContainerRef,
    private componentResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnDestroy(): void {
    this.destroyMenu();
  }
}
