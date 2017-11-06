import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      exhaustMap(() =>
        this.pizzaService
          .getPizzas()
          .pipe(
            map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
          )
      )
    );

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      map((action: pizzaActions.CreatePizza) => action.payload),
      exhaustMap(pizza =>
        this.pizzaService
          .createPizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
          )
      )
    );

  @Effect({ dispatch: false })
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      tap(pizza => this.router.navigate([`/products/${pizza.id}`]))
    );

  @Effect()
  updatePizza$ = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
      map((action: pizzaActions.UpdatePizza) => action.payload),
      exhaustMap(pizza =>
        this.pizzaService
          .updatePizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
          )
      )
    );

  @Effect()
  removePizza$ = this.actions$
    .ofType(pizzaActions.REMOVE_PIZZA)
    .pipe(
      map((action: pizzaActions.RemovePizza) => action.payload),
      exhaustMap(pizza =>
        this.pizzaService
          .removePizza(pizza)
          .pipe(
            map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
          )
      )
    );

  @Effect({ dispatch: false })
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(tap(() => this.router.navigate([`/products`])));
}
