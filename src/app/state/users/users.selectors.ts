import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, usersFeatureKey } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>(usersFeatureKey);
export const selectUsers = createSelector(selectUsersState, (state) => state.users);
export const selectUsersPage = createSelector(selectUsersState, (state) => state.currentPage);
export const selectUsersPageSize = createSelector(selectUsersState, (state) => state.pageSize);
export const selectUsersTotal = createSelector(selectUsersState, (state) => state.users.length);
export const selectPaginatedUsers = createSelector(
  selectUsers,
  selectUsersPage,
  selectUsersPageSize,
  (users, page, pageSize) => users.slice((page - 1) * pageSize, page * pageSize),
);
export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);
export const selectUsersError = createSelector(selectUsersState, (state) => state.error);
