import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../shared/model/user.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Set Page': props<{ page: number }>(),
  },
});
