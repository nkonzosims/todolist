import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { Todo } from '../../shared/model/todo.model';
import { TodoService } from '../../shared/service/todo/todo-service';
import { TodosActions } from './todos.actions';
import { TodosEffects } from './todos.effects';

describe('TodosEffects', () => {
  let actions$: Observable<unknown>;
  let effects: TodosEffects;
  const todosService = {
    getTodos: jest.fn(),
    getTodosById: jest.fn(),
  };
  const todos: Todo[] = [{ id: 1, userId: 1, title: 'Test', completed: false }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        provideMockActions(() => actions$),
        { provide: TodoService, useValue: todosService },
      ],
    });
    effects = TestBed.inject(TodosEffects);
    jest.clearAllMocks();
  });

  it('loads todos for a selected user', async () => {
    todosService.getTodosById.mockReturnValue(of(todos));
    actions$ = of(TodosActions.loadTodos({ userId: 1 }));

    expect(await firstValueFrom(effects.loadTodos$)).toEqual(
      TodosActions.loadTodosSuccess({ todos }),
    );
    expect(todosService.getTodosById).toHaveBeenCalledWith(1);
  });

  it('loads all todos when no user is selected', async () => {
    todosService.getTodos.mockReturnValue(of(todos));
    actions$ = of(TodosActions.loadTodos({ userId: null }));

    await firstValueFrom(effects.loadTodos$);
    expect(todosService.getTodos).toHaveBeenCalled();
  });

  it('dispatches failure when loading todos fails', async () => {
    todosService.getTodos.mockReturnValue(throwError(() => new Error('Network error')));
    actions$ = of(TodosActions.loadTodos({ userId: null }));

    expect(await firstValueFrom(effects.loadTodos$)).toEqual(
      TodosActions.loadTodosFailure({ error: 'Unable to load todos. Please try again.' }),
    );
  });
});
