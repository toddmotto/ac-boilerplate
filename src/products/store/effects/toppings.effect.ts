import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {
  constructor(private toppingsService: fromServices.ToppingsService) {}
}
