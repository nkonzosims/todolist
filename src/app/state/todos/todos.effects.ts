import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TodoService } from '../../shared/service/todo/todo-service';
import { TodosActions } from './todos.actions';

@Injectable()
export class TodosEffects {
  private readonly actions$ = inject(Actions);
  private readonly todoService = inject(TodoService);

  readonly loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(({ userId }) => {
        const request = userId
          ? this.todoService.getTodosById(userId)
          : this.todoService.getTodos();

        return request.pipe(
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError(() =>
            of(
              TodosActions.loadTodosFailure({
                error: 'Unable to load todos. Please try again.',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
