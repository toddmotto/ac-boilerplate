import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

export const MY_ACTION = '[Feature] My Action';
export const LOAD_PIZZAS = '[Pizzas] LoadPizzas';
export const LOAD_PIZZAS_SUCCESS = '[Pizzas] LoadPizzasSuccess';
export const LOAD_PIZZAS_FAIL = '[Pizzas] LoadPizzasFail';

export class MyAction implements Action {
  readonly type = MY_ACTION;
  constructor(public payload: any) {}
}

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

// action types
export type PizzasAction =
  MyAction |
  LoadPizzas |
  LoadPizzasSuccess |
  LoadPizzasFail;
