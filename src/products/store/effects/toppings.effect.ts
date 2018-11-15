import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {
  @Effect() public loadToppings$ = this.actions$
    .ofType(toppingsActions.LOAD_TOPPINGS)
    .pipe(
      exhaustMap(() => {
        const { LoadToppingsSuccess, LoadToppingsFail } = toppingsActions;
        return this.toppingsService.getToppings()
          .pipe(
            map((toppings) => new LoadToppingsSuccess(toppings)),
            catchError(error => of(new LoadToppingsFail(error))),
          );
      }),
    );

  constructor(
    private toppingsService: fromServices.ToppingsService,
    private actions$: Actions,
  ) {}
}
