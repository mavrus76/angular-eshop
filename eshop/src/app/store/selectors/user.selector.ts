import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { User } from '../reducers/user.reducer';

// eslint-disable-next-line @ngrx/prefer-one-generic-in-create-for-feature-selector
export const selectUserState = createFeatureSelector<AppState, User>('user');
