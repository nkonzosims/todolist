import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UsersActions } from '../../state/users/users.actions';
import {
  selectPaginatedUsers,
  selectUsersError,
  selectUsersLoading,
  selectUsersPage,
  selectUsersPageSize,
  selectUsersTotal,
} from '../../state/users/users.selectors';
import { User } from '../../shared/model/user.model';
import { UsersPage } from './users-page';

describe('UsersPage', () => {
  let fixture: ComponentFixture<UsersPage>;
  let component: UsersPage;
  let store: MockStore;
  const router = { navigate: jest.fn().mockResolvedValue(true) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectPaginatedUsers, value: [] },
            { selector: selectUsersLoading, value: false },
            { selector: selectUsersError, value: null },
            { selector: selectUsersPage, value: 1 },
            { selector: selectUsersPageSize, value: 5 },
            { selector: selectUsersTotal, value: 0 },
          ],
        }),
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads users when initialized', () => {
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.loadUsers());
  });

  it('dispatches a page change', () => {
    component.changePage(2);
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.setPage({ page: 2 }));
  });

  it('navigates to the selected user todos', () => {
    component.viewTodos({ id: 7 } as User);
    expect(router.navigate).toHaveBeenCalledWith(['/todos'], {
      queryParams: { userId: 7 },
    });
  });
});
