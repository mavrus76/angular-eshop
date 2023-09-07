import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <app-top-bar></app-top-bar>

      <div class="content">
        <span>eShop app is running!</span>
      </div>

      <div class="container">
        <div>
          <router-outlet
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)"></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        margin: auto;
        max-width: 1024px;
        width: 100%;
        padding: 40px 20px;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'eShop';

  onActivate(e: any) {
    console.log(e);
  }
  onDeactivate(e: any) {
    console.log(e);
  }

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('navigation start');
      }
      if (event instanceof NavigationEnd) {
        // this.analytics.pageChange(page.path)
        console.log('navigation end');
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {}
}
