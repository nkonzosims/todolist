import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../shared/model/todo.model';
import { TodosActions } from './todos.actions';

export const todosFeatureKey = 'todos';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
}

export const initialTodosState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
};

export const todosReducer = createReducer(
  initialTodosState,
  on(TodosActions.loadTodos, (state) => ({ ...state, loading: true, error: null })),
  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    currentPage: 1,
  })),
  on(TodosActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodosActions.setPage, (state, { page }) => ({ ...state, currentPage: page })),
);
