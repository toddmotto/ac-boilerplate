import { Action } from '@ngrx/store';

export const LOAD_TOPPINGS = '[Toppings] LoadToppings';
export const LOAD_TOPPINGS_SUCCESS = '[Toppings] LoadToppingsSuccess';
export const LOAD_TOPPINGS_FAIL = '[Toppings] LoadToppingsFail';

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: string[]) {}
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

// action types
export type ToppingsAction =
  LoadToppings |
  LoadToppingsSuccess |
  LoadToppingsFail;
