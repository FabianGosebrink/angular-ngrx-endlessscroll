import { createAction, props } from '@ngrx/store';
import { Item } from '../item';

const prefix = `[Home]`;

export const getItems = createAction(`${prefix} getItems`);
export const getMoreItems = createAction(`${prefix} getMoreItems`);

export const getItemsComplete = createAction(
  `${prefix} getItemsComplete`,
  props<{ payload: Item[] }>()
);

export const error = createAction(
  `${prefix} homeError`,
  props<{ payload: any }>()
);
