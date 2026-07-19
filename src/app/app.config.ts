import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TodosEffects } from './state/todos/todos.effects';
import { todosFeatureKey, todosReducer } from './state/todos/todos.reducer';
import { UsersEffects } from './state/users/users.effects';
import { usersFeatureKey, usersReducer } from './state/users/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      [usersFeatureKey]: usersReducer,
      [todosFeatureKey]: todosReducer,
    }),
    provideEffects(UsersEffects, TodosEffects),
  ],
};
