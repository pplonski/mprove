import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as actions from '@app/store-actions/actions';
import * as actionTypes from '@app/store-actions/action-types';

@Injectable()
export class SetProjectQuerySizeLimitSuccessEffect {
  @Effect() setProjectQuerySizeLimitSuccess$: Observable<
    Action
  > = this.actions$.pipe(
    ofType(actionTypes.SET_PROJECT_QUERY_SIZE_LIMIT_SUCCESS),
    mergeMap((action: actions.SetProjectQuerySizeLimitSuccessAction) =>
      from([new actions.UpdateProjectsStateAction([action.payload.project])])
    )
  );

  constructor(private actions$: Actions) {}
}
