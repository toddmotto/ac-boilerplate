import { Action } from '@ngrx/store';

export const ANOTHER_ACTION = '[Feature] Another Action';

export class AnotherAction implements Action {
  readonly type = ANOTHER_ACTION;
  constructor(public payload: any) {}
}

// action types
export type ToppingsAction = AnotherAction;
