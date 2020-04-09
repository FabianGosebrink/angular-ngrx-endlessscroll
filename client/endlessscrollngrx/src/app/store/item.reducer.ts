import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import * as appActions from './item.actions';
import { Item } from '../item';

export interface AppState {
  itemState: ItemState;
}

export interface ItemState {
  items: Item[];
  loading: boolean;
}

export const initialState: ItemState = {
  items: [],
  loading: false,
};

export const itemReducer = createReducer(
  initialState,

  on(appActions.getItems, appActions.getMoreItems, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(appActions.getItemsComplete, (state, { payload }) => {
    return {
      ...state,
      items: [...state.items, ...payload],
      loading: false,
    };
  })
);
