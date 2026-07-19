import { createActionGroup, props } from '@ngrx/store';
import { Todo } from '../../shared/model/todo.model';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Load Todos': props<{ userId: number | null }>(),
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Load Todos Failure': props<{ error: string }>(),
    'Set Page': props<{ page: number }>(),
  },
});
