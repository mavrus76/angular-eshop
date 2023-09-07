import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/reducers/user.reducer';
import * as fromUser from 'src/app/store/reducers/user.reducer';
import { signInSuccess } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-sign-in-page',
  template: `
    <div class="sign-in__container">
      <div class="sign-in__form-container">
        <h2>Войти в личный кабинет</h2>
        <app-sign-in-form (onSignIn)="storeUser($event)"></app-sign-in-form>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .sign-in__container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 100px);
      }
      .sign-in__form-container {
        width: 40%;
      }
      /* .sign-in__form {
        margin-top: 32px;
      } */
    `,
  ],
})
export class SignInPageComponent implements OnInit {
  public storeUser(user: User): void {
    this.store.dispatch(signInSuccess({ user }));
  }

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private store: Store<fromUser.User>) {}

  ngOnInit(): void {}
}
