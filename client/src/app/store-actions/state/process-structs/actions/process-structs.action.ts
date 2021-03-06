import { Action } from '@ngrx/store';
import * as api from '@app/api/_index';
import * as actionTypes from '@app/store-actions/action-types';

export class ProcessStructsAction implements Action {
  type = actionTypes.PROCESS_STRUCTS;

  constructor(public payload: api.Struct[]) {}
}
