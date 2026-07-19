import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { User } from '../../shared/model/user.model';
import { UsersService } from '../../shared/service/users/users-service';
import { UsersActions } from './users.actions';
import { UsersEffects } from './users.effects';

describe('UsersEffects', () => {
  let actions$: Observable<unknown>;
  let effects: UsersEffects;
  const usersService = { getUsers: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        { provide: UsersService, useValue: usersService },
      ],
    });
    effects = TestBed.inject(UsersEffects);
    jest.clearAllMocks();
  });

  it('dispatches success after loading users', async () => {
    const users = [{ id: 1, name: 'Test User' }] as User[];
    usersService.getUsers.mockReturnValue(of(users));
    actions$ = of(UsersActions.loadUsers());

    expect(await firstValueFrom(effects.loadUsers$)).toEqual(
      UsersActions.loadUsersSuccess({ users }),
    );
  });

  it('dispatches failure when loading users fails', async () => {
    usersService.getUsers.mockReturnValue(throwError(() => new Error('Network error')));
    actions$ = of(UsersActions.loadUsers());

    expect(await firstValueFrom(effects.loadUsers$)).toEqual(
      UsersActions.loadUsersFailure({ error: 'Unable to load users. Please try again.' }),
    );
  });
});
