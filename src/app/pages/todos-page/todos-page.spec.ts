import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodosActions } from '../../state/todos/todos.actions';
import {
  selectPaginatedTodos,
  selectTodosError,
  selectTodosLoading,
  selectTodosPage,
  selectTodosPageSize,
  selectTodosTotal,
} from '../../state/todos/todos.selectors';
import { TodosPage } from './todos-page';

describe('TodosPage', () => {
  let fixture: ComponentFixture<TodosPage>;
  let component: TodosPage;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosPage],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectPaginatedTodos, value: [] },
            { selector: selectTodosLoading, value: false },
            { selector: selectTodosError, value: null },
            { selector: selectTodosPage, value: 1 },
            { selector: selectTodosPageSize, value: 10 },
            { selector: selectTodosTotal, value: 0 },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap({ userId: '3' }) } },
        },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(TodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads todos for the user in the query string', () => {
    expect(component.userId).toBe(3);
    expect(store.dispatch).toHaveBeenCalledWith(TodosActions.loadTodos({ userId: 3 }));
  });

  it('dispatches a page change', () => {
    component.changePage(2);
    expect(store.dispatch).toHaveBeenCalledWith(TodosActions.setPage({ page: 2 }));
  });
});

describe('TodosPage without a valid user', () => {
  it('loads all todos', async () => {
    await TestBed.configureTestingModule({
      imports: [TodosPage],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap({ userId: 'invalid' }) } },
        },
      ],
    }).compileComponents();
    const store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');

    const fixture = TestBed.createComponent(TodosPage);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(TodosActions.loadTodos({ userId: null }));
  });
});
