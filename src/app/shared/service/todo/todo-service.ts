import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../model/todo.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);

  getTodos() {
    return this.http.get<Array<Todo>>('/api/todos');
  }

  getTodosById(id: number) {
    return this.getTodos().pipe(map((todos) => todos.filter((todo) => todo.userId === id)));
  }
}
