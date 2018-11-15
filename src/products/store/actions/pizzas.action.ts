import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

export const LOAD_PIZZAS = '[Pizzas] LoadPizzas';
export const LOAD_PIZZAS_SUCCESS = '[Pizzas] LoadPizzasSuccess';
export const LOAD_PIZZAS_FAIL = '[Pizzas] LoadPizzasFail';
export const SELECT_PIZZA = '[Pizzas] SelectPizza';

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

export class SelectPizza implements Action {
  readonly type = SELECT_PIZZA;
  constructor(public payload: Pizza) {}
}

// action types
export type PizzasAction =
  LoadPizzas |
  LoadPizzasSuccess |
  LoadPizzasFail |
  SelectPizza;
