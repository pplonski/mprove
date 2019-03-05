import { createSelector } from '@ngrx/store';
import { getSelectedMconfig } from '@app/store-selectors/get-selected-mconfig/get-selected-mconfig';
import * as api from '@app/api/_index';

export const getSelectedMconfigSelect = createSelector(
  getSelectedMconfig,
  (mconfig: api.Mconfig) => (mconfig ? mconfig.select : undefined)
);