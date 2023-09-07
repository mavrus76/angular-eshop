import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/store/reducers/user.reducer';

@Component({
  selector: 'app-sign-in-form',
  template: `
    <form class="user-form" [formGroup]="signInForm" (ngSubmit)="signIn()">
      <div class="form-group">
        <label>Имя:</label>
        <input
          class="form-control"
          type="text"
          name="firstName"
          formControlName="firstName" />
      </div>
      <div class="form-group">
        <label>Фамилия:</label>
        <input
          class="form-control"
          type="text"
          name="lastName"
          formControlName="lastName" />
      </div>
      <div class="form-group">
        <label>E-mail:</label>
        <input
          class="form-control"
          type="text"
          name="email"
          formControlName="email" />
      </div>
      <button ui-button buttonType="primary" type="submit">Войти</button>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      button {
        width: 100%;
        border: none;
        border-radius: 24px;
        padding: 15px 0;
        background-color: transparent;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
      }
      .primary {
        color: #fff;
        background-color: #ff4081;
      }
      .form-group {
        margin-bottom: 24px;
      }
    `,
  ],
})
export class SignInFormComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onSignIn: EventEmitter<User> = new EventEmitter<User>();
  public signInForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    email: '',
  });

  public signIn(): void {
    const formValue = this.signInForm.value;
    this.onSignIn.emit(formValue);
    this.signInForm.reset();
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
