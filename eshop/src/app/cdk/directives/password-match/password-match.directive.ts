import { Directive } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { PasswordMatchValidator } from '../../validators/password-match.validator';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  validate(formGroup: FormGroup): ValidationErrors | null {
    console.log(formGroup);
    return PasswordMatchValidator(formGroup);
  }

  constructor() {}
}
