import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState, todosFeatureKey } from './todos.reducer';

export const selectTodosState = createFeatureSelector<TodosState>(todosFeatureKey);
export const selectTodos = createSelector(selectTodosState, (state) => state.todos);
export const selectTodosPage = createSelector(selectTodosState, (state) => state.currentPage);
export const selectTodosPageSize = createSelector(selectTodosState, (state) => state.pageSize);
export const selectTodosTotal = createSelector(selectTodosState, (state) => state.todos.length);
export const selectPaginatedTodos = createSelector(
  selectTodos,
  selectTodosPage,
  selectTodosPageSize,
  (todos, page, pageSize) => todos.slice((page - 1) * pageSize, page * pageSize),
);
export const selectTodosLoading = createSelector(selectTodosState, (state) => state.loading);
export const selectTodosError = createSelector(selectTodosState, (state) => state.error);
