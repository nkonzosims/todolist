import { Routes } from '@angular/router';
import { TodosPage } from './pages/todos-page/todos-page';
import { UsersPage } from './pages/users-page/users-page';

export const routes: Routes = [
  { path: 'users', component: UsersPage, title: 'Users' },
  { path: 'todos', component: TodosPage, title: 'Todos' },
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: '**', redirectTo: 'users' },
];
