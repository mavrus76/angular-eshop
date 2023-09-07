import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { NgForObjDirectiveModule } from '../cdk/directives/ngForObj/ng-for-obj.directive.module';
import { ButtonModule } from '../cdk/button/button.module';
import { OnClickOutDirectiveModule } from '../cdk/directives/onClickOut/on-click-out.directive.module';
import { MenuDirectiveModule } from '../cdk/directives/menu/menu.directive.module';
import { UiMenuModule } from '../cdk/ui-menu/ui-menu.module';
import { DropdownModule } from '../cdk/dropdown/dropdown.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    NgForObjDirectiveModule,
    OnClickOutDirectiveModule,
    MenuDirectiveModule,
    UiMenuModule,
    DropdownModule,
  ],
  exports: [HomepageComponent],
})
export class HomepageModule {}
