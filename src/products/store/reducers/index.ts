import { ActionReducerMap } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

// feature state
export interface ProductsState {}

// reducers
export const reducers: ActionReducerMap<ProductsState> = {};
