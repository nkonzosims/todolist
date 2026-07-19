import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserCard } from '../../components/user-card/user-card';
import { Pagination } from '../../components/pagination/pagination';
import { User } from '../../shared/model/user.model';
import { UsersActions } from '../../state/users/users.actions';
import {
  selectPaginatedUsers,
  selectUsersError,
  selectUsersLoading,
  selectUsersPage,
  selectUsersPageSize,
  selectUsersTotal,
} from '../../state/users/users.selectors';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, Pagination, UserCard],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectPaginatedUsers);
  readonly loading$ = this.store.select(selectUsersLoading);
  readonly error$ = this.store.select(selectUsersError);
  readonly currentPage$ = this.store.select(selectUsersPage);
  readonly pageSize$ = this.store.select(selectUsersPageSize);
  readonly totalItems$ = this.store.select(selectUsersTotal);

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  viewTodos(user: User): void {
    void this.router.navigate(['/todos'], {
      queryParams: { userId: user.id },
    });
  }

  changePage(page: number): void {
    this.store.dispatch(UsersActions.setPage({ page }));
  }
}
