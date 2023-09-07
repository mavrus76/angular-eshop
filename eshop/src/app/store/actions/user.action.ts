import { createAction, props } from '@ngrx/store';
import { User } from '../reducers/user.reducer';

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{ user: User }>()
);
