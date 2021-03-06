import { Action } from '@ngrx/store';
import * as api from '@app/api/_index';
import * as actionTypes from '@app/store-actions/action-types';

export class UpdateUserPasswordFailAction implements Action {
  readonly type = actionTypes.UPDATE_USER_PASSWORD_FAIL;

  constructor(public payload: { error: any }) {}
}
