import * as fromReducer from './item.reducer';
import { createSelector } from '@ngrx/store';

export const selectItemState = (state: fromReducer.AppState) => state.itemState;

export const selectAllItems = createSelector(
  selectItemState,
  (state: fromReducer.ItemState) => state.items
);

export const selectAllItemsLength = createSelector(
  selectItemState,
  (state: fromReducer.ItemState) => state.items.length
);

export const selectIsLoading = createSelector(
  selectItemState,
  (state: fromReducer.ItemState) => state.loading
);
