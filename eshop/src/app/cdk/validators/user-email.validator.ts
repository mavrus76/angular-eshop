import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
import { CheckoutService } from 'src/app/services/checkout.service';

export const userEmailValidator = (
  checkoutService: CheckoutService
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> =>
    combineLatest([
      checkoutService.checkUser(control.value),
      checkoutService.checkBlocked(control.value),
    ]).pipe(
      map(([checkUser, checkBlocked]) => {
        if (checkUser.isEmailExist) {
          return { emailExist: true };
        }
        if (checkBlocked.isEmailBlocked) {
          return { emailBlocked: true };
        }
        return null;
      })
    );
};
