import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {
  constructor(
    private toppingsService: fromServices.ToppingsService,
    private actions$: Actions
  ) {}

  @Effect()
  loadToppings$ = this.actions$
    .ofType(toppingsActions.LOAD_TOPPINGS)
    .pipe(
      exhaustMap(() =>
        this.toppingsService
          .getToppings()
          .pipe(
            map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
            catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
          )
      )
    );
}
