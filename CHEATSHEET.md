# NGRX Workshop Cheatsheet

> This document provides you code examples for all the tasks of the workshop. Use them wisely.

## Store and Effects Modules

> NGRX supports both root and feature modules, eagerly or lazily loaded.

## Workshop Exercises

Go [here](https://docs.google.com/document/d/1f8CnHwN9tc2cvYq4cnjIPteWA_EafQtE4pdYsrEksI0/edit?usp=sharing) to view the workshop exercises.

#### Imports

```js
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
```

#### Root Module

```js
// *.module.ts

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
  ],
})
export class RootModule {}
```

#### Feature Module

```js
// *.module.ts

@NgModule({
  imports: [
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class FeatureModule {}
```

## Actions

> Actions describe an event, and take a `type` and optional `payload`.

#### Action Constants and Creators

```js
// *.actions.ts

export const ADD_TODO = '[Todos] Add Todo';
export const REMOVE_TODO = '[Todos] Remove Todo';

import { Action } from '@ngrx/store';

export class AddTodo implements Action {
  readonly type = ADD_TODO;
  constructor(public payload: any) {}
}

export class RemoveTodo implements Action {
  readonly type = REMOVE_TODO;
  constructor(public payload: any) {}
}

export type TodosAction = AddTodo | RemoveTodo;
```

#### Action Reducers

```js
// */store/index.ts

import { ActionReducerMap } from '@ngrx/store';

import * as fromTodos from './todos.reducer';

export interface FeatureState {
  todos: fromTodos.TodosState;
}

export const reducers: ActionReducerMap<FeatureState> = {
  todos: fromTodos.reducer
};
```

#### Dispatching Actions

Inside a component you can dispatch an action:

```js
addTodo(event: Todo) {
  this.store.dispatch(new fromStore.AddTodo(event));
}
```

## Selectors

> Selectors allow you to select slices of state to be returned by the selector.

#### createSelector

The createSelector method returns a callback function for selecting a slice of state.

```js
// *.reducers.ts
export interface FeatureState {
  todos: Todo[];
}

export const getTodos = (state: FeatureState) => state.todos;

// store/reducers/index.ts
import { createSelector } from '@ngrx/store';

import * as fromTodos from './todos.reducer';

export interface AppState {
  feature: fromTodos.FeatureState
}

export const getFeatureState = (state: AppState) => state.feature;
export const getFeatureStateTodos = createSelector(getFeatureState, fromTodos.getTodos);
```

#### createFeatureSelector

The createFeatureSelector is a convenience method for returning a top level feature state. It returns a typed selector function for a feature slice of state.

```js
// *.reducers.ts
export interface FeatureState {
  todos: Todo[];
}

export const getTodos = (state: FeatureState) => state.todos;

// store/reducers/index.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromTodos from './todos.reducer';

export interface FeatureState {
  todos: Todo[];
}

export interface AppState {
  feature: fromTodos.FeatureState
}

export const getFeatureState = createFeatureSelector<FeatureState>('feature');
export const getFeatureStateTodos = createSelector(
  getFeatureState,
  fromTodos.getTodos
);
```

#### Component Store Selectors

```js
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<fromStore.TodosState>) {}

  ngOnInit() {
    this.todos$ = this.store.select(fromStore.getTodos);
  }
}
```

#### Component Template Bindings

Be sure to subscribe/unwrap the Observable returned from `store.select()` via an `async` pipe:

```html
<div *ngFor="let todo of (todos$ | async)">
  {{ todo.label }}
</div>
```

## Reducers

```js
// todo.reducer.ts

export interface TodosState {
  loaded: boolean;
  loading: boolean;
  todos: Todo[];
}

const initialState: TodosState = {
  loaded: false,
  loading: false,
  todos: [],
};

export function reducer(state = initialState, action: fromTodos.TodossAction): TodosState {
  switch (action.type) {
    case fromTodos.ADD_TODO: {
      const todo = action.payload;
      const todos = [...state.todos, todo];
      return {
        ...state,
        todos
      };
    }
  }

  return state;
}

// example selector
export const getTodos = (state: TodosState) => state.todos;
```

## Effects

#### Effects, with dispatch

When using `@Effect()`, it will dispatch any actions returned.

```js
// todo.effect.ts
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Effect, Actions } from '@ngrx/effects';

import * as todoActions from '../actions/todo.action';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private todosService: fromServices.TodosService
  ) {}

  @Effect()
  createTodo$ = this.actions$
    .ofType(todoActions.CREATE_TODO)
    .pipe(
      map((action: todoActions.CreateTodo) => action.payload),
      exhaustMap((todo) => {
        return this.todosService
          .createTodo(todo)
          .pipe(
            map(todo => new todoActions.LoadTodoSuccess(todo)),
            catchError(error => of(new todoActions.LoadTodoFail(error)))
          )
      })
    );
}
```

#### Effects, no dispatch

When using `@Effect({ dispatch: false })`, it will prevent any dispatches. For example when a previous action has completed and you wish to perform a side effect, such as navigation.

```js
// todo.effect.ts
import { tap, map, catchError, exhaustMap } from 'rxjs/operators';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private todosService: fromServices.TodosService
  ) {}

  @Effect()
  createTodo$ = this.actions$
    .ofType(todoActions.CREATE_TODO)
    .pipe(
      map((action: todoActions.CreateTodo) => action.payload),
      exhaustMap((todo) => {
        return this.todosService
          .createTodo(todo)
          .pipe(
            map(todo => new todoActions.CreateTodoSuccess(todo)),
            catchError(error => of(new todoActions.CreateTodoFail(error)))
          )
      })
    );

@Effect({ dispatch: false })
createTodoSuccess$ = this.actions$
    .ofType(todoActions.CREATE_TODO_SUCCESS)
    .pipe(
       map((action: todoActions.CreateTodoSuccess) => action.payload),
       tap(todo => this.router.navigate([`/todos/${todo.id}`]))
    );
}
```