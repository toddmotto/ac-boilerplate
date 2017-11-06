import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  loaded: boolean;
  loading: boolean;
  selected: Pizza;
  pizzas: Pizza[];
}

const initialState: PizzaState = {
  loaded: false,
  loading: false,
  selected: null,
  pizzas: [],
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        pizzas,
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }

    case fromPizzas.SELECT_PIZZA: {
      const selected = action.payload;
      return {
        ...state,
        selected,
      };
    }

    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const pizzas = [...state.pizzas, pizza];
      return {
        ...state,
        loaded: true,
        loading: false,
        pizzas,
      };
    }

    case fromPizzas.UPDATE_PIZZA_SUCCESS: {
      const newPizza = action.payload;
      const pizzas = state.pizzas.map(
        pizza => (pizza.id === newPizza.id ? newPizza : pizza)
      );
      return {
        ...state,
        selected: null,
        pizzas,
      };
    }

    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      const oldPizza = action.payload;
      const pizzas = state.pizzas.filter(pizza => pizza.id !== oldPizza.id);

      return {
        ...state,
        selected: null,
        pizzas,
      };
    }
  }
  return state;
}

export const getPizzas = (state: PizzaState) => state.pizzas;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getSelectedPizza = (state: PizzaState) => state.selected;
