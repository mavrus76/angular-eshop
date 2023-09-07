import { FormGroup, ValidationErrors } from '@angular/forms';

export function PasswordMatchValidator(
  form: FormGroup
): ValidationErrors | null {
  const passwordField = form.controls['password'];
  const confirmField = form.controls['confirm'];

  if (!passwordField || !confirmField) {
    return null;
  }

  if (confirmField.errors && !confirmField.errors['passwordMatch']) {
    return null;
  }

  return passwordField.value !== confirmField.value
    ? { passwordMatch: true }
    : null;
}
