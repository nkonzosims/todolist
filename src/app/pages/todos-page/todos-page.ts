import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Pagination } from '../../components/pagination/pagination';
import { TodosActions } from '../../state/todos/todos.actions';
import {
  selectPaginatedTodos,
  selectTodosError,
  selectTodosLoading,
  selectTodosPage,
  selectTodosPageSize,
  selectTodosTotal,
} from '../../state/todos/todos.selectors';

@Component({
  selector: 'app-todos-page',
  imports: [AsyncPipe, Pagination, RouterLink],
  templateUrl: './todos-page.html',
  styleUrl: './todos-page.scss',
})
export class TodosPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  readonly todos$ = this.store.select(selectPaginatedTodos);
  readonly loading$ = this.store.select(selectTodosLoading);
  readonly error$ = this.store.select(selectTodosError);
  readonly currentPage$ = this.store.select(selectTodosPage);
  readonly pageSize$ = this.store.select(selectTodosPageSize);
  readonly totalItems$ = this.store.select(selectTodosTotal);
  userId: number | null = null;

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.queryParamMap.get('userId');
    const parsedUserId = userIdParam === null ? NaN : Number(userIdParam);
    this.userId = Number.isInteger(parsedUserId) && parsedUserId > 0 ? parsedUserId : null;

    this.store.dispatch(TodosActions.loadTodos({ userId: this.userId }));
  }

  changePage(page: number): void {
    this.store.dispatch(TodosActions.setPage({ page }));
  }
}
