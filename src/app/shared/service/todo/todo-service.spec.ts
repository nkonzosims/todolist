import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TodoService } from './todo-service';
import { Todo } from '../../model/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TodoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads all todos from the API', () => {
    const todos: Todo[] = [{ id: 1, userId: 1, title: 'Test', completed: false }];
    service.getTodos().subscribe((result) => expect(result).toEqual(todos));
    http.expectOne('/api/todos').flush(todos);
  });

  it('filters todos by user id', () => {
    const todos: Todo[] = [
      { id: 1, userId: 1, title: 'First', completed: false },
      { id: 2, userId: 2, title: 'Second', completed: true },
    ];
    service.getTodosById(2).subscribe((result) => expect(result).toEqual([todos[1]]));
    http.expectOne('/api/todos').flush(todos);
  });
});
