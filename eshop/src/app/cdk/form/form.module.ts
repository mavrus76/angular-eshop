import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { ErrorModule } from '../error/error.module';
import { PasswordMatchDirectiveModule } from '../directives/password-match/password-match.directive.module';

@NgModule({
  declarations: [CheckoutComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ErrorModule,
    PasswordMatchDirectiveModule,
  ],
  exports: [CheckoutComponent, RegistrationComponent],
})
export class FormModule {}
