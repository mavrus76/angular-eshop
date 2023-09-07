import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MenuContainerDirective } from '../directives/menu/menu-container.directive';

type positionMenu = 'left' | 'right' | 'above' | 'below';

@Component({
  selector: 'app-ui-menu',
  template: `
    <!-- style.left or style.top -->
    <div class="menu-container" [style.left.px]="position">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .menu-container {
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
export class UiMenuComponent implements OnInit, AfterViewInit {
  @Input() positionMenu: positionMenu = 'right';
  @ViewChild(MenuContainerDirective, { read: ElementRef })
  private menuContainer!: ElementRef;
  public position!: number;

  constructor(
    @Inject('menuConfig') private config: { host: HTMLElement },
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const { top, bottom, left } = this.config.host.getBoundingClientRect();
    console.log({ top, bottom, left });

    const heightHost = this.config.host.getBoundingClientRect().height;
    const widthHost = this.config.host.getBoundingClientRect().width;

    const { height, width } =
      this.menuContainer.nativeElement.getBoundingClientRect();
    const menuContainer = this.menuContainer.nativeElement;
    const topMenu =
      this.menuContainer.nativeElement.getBoundingClientRect().top;

    if (this.positionMenu === 'above') {
      this.position = top - height;
    }
    if (this.positionMenu === 'below') {
      this.position = bottom;
    }
    if (this.positionMenu === 'left') {
      this.position = left - width;
      this.renderer.setStyle(menuContainer, 'top', `${topMenu - heightHost}px`);
    }
    if (this.positionMenu === 'right') {
      this.position = left + widthHost;
      this.renderer.setStyle(menuContainer, 'top', `${topMenu - heightHost}px`);
    }
    this.cdr.detectChanges();
  }
}
