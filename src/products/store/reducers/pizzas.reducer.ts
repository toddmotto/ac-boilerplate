import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  loaded: boolean;
  loading: boolean;
  pizzas: Pizza[];
}

const initialState: PizzaState = {
  loaded: false,
  loading: false,
  pizzas: [],
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS:
      console.log('LoadPizzas', state);
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case fromPizzas.LOAD_PIZZAS_SUCCESS:
      return {
        ...state,
        pizzas: action.payload,
        loaded: true,
        loading: false,
      };
  }
  return state;
}

export const getPizzas = (state: PizzaState) => state.pizzas;

export const getPizzasLoaded = (state: PizzaState) => state.loaded;

export const getPizzasLoading = (state: PizzaState) => state.loading;
