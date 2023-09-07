import { createReducer, on } from '@ngrx/store';
import { signInSuccess } from '../actions/user.action';

export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export const initialUserState: User = {
  firstName: null,
  lastName: null,
  email: null,
};

export const reducer = createReducer(
  initialUserState,
  // eslint-disable-next-line @ngrx/on-function-explicit-return-type
  on(signInSuccess, (state, { user }) => ({
    ...state,
    ...user,
  }))
);
