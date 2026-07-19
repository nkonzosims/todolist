import { Todo } from '../../shared/model/todo.model';
import { TodosActions } from './todos.actions';
import { initialTodosState, todosReducer } from './todos.reducer';
import {
  selectPaginatedTodos,
  selectTodosError,
  selectTodosLoading,
  selectTodosTotal,
} from './todos.selectors';

const todo = (id: number): Todo => ({ id, userId: 1, title: `Todo ${id}`, completed: false });

describe('todos state', () => {
  it('handles loading, success, failure and page actions', () => {
    const loading = todosReducer(initialTodosState, TodosActions.loadTodos({ userId: 1 }));
    expect(loading).toMatchObject({ loading: true, error: null });

    const success = todosReducer(
      { ...loading, currentPage: 3 },
      TodosActions.loadTodosSuccess({ todos: [todo(1)] }),
    );
    expect(success).toMatchObject({ loading: false, currentPage: 1 });

    expect(todosReducer(success, TodosActions.setPage({ page: 2 })).currentPage).toBe(2);
    expect(todosReducer(loading, TodosActions.loadTodosFailure({ error: 'Failed' }))).toMatchObject(
      { loading: false, error: 'Failed' },
    );
  });

  it('selects status, totals and the current page of todos', () => {
    const todos = Array.from({ length: 12 }, (_, index) => todo(index + 1));
    const state = { ...initialTodosState, todos, loading: true, error: 'Error' };

    expect(selectPaginatedTodos.projector(todos, 2, 10).map(({ id }) => id)).toEqual([11, 12]);
    expect(selectTodosTotal.projector(state)).toBe(12);
    expect(selectTodosLoading.projector(state)).toBe(true);
    expect(selectTodosError.projector(state)).toBe('Error');
  });
});
