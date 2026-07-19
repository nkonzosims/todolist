import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/model/user.model';
import { UsersActions } from './users.actions';

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
}

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 5,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    currentPage: 1,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UsersActions.setPage, (state, { page }) => ({ ...state, currentPage: page })),
);
