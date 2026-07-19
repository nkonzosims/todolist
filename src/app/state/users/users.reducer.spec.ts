import { User } from '../../shared/model/user.model';
import { UsersActions } from './users.actions';
import { initialUsersState, usersReducer } from './users.reducer';
import {
  selectPaginatedUsers,
  selectUsersError,
  selectUsersLoading,
  selectUsersTotal,
} from './users.selectors';

const user = (id: number) => ({ id, name: `User ${id}` }) as User;

describe('users state', () => {
  it('handles loading, success, failure and page actions', () => {
    const loading = usersReducer(initialUsersState, UsersActions.loadUsers());
    expect(loading).toMatchObject({ loading: true, error: null });

    const success = usersReducer(
      { ...loading, currentPage: 2 },
      UsersActions.loadUsersSuccess({ users: [user(1), user(2)] }),
    );
    expect(success).toMatchObject({ loading: false, currentPage: 1 });
    expect(success.users).toHaveLength(2);

    const changedPage = usersReducer(success, UsersActions.setPage({ page: 2 }));
    expect(changedPage.currentPage).toBe(2);

    const failure = usersReducer(loading, UsersActions.loadUsersFailure({ error: 'Failed' }));
    expect(failure).toMatchObject({ loading: false, error: 'Failed' });
  });

  it('selects status, totals and the current page of users', () => {
    const state = {
      ...initialUsersState,
      users: Array.from({ length: 7 }, (_, index) => user(index + 1)),
      currentPage: 2,
      loading: true,
      error: 'Error',
    };

    expect(selectPaginatedUsers.projector(state.users, 2, 5).map(({ id }) => id)).toEqual([6, 7]);
    expect(selectUsersTotal.projector(state)).toBe(7);
    expect(selectUsersLoading.projector(state)).toBe(true);
    expect(selectUsersError.projector(state)).toBe('Error');
  });
});
