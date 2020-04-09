import { ItemEffects } from './item.effects';
import { ActionReducerMap } from '@ngrx/store';
import { AppState, itemReducer } from './item.reducer';

export * from './item.selectors';
export * from './item.actions';

export const itemEffects = [ItemEffects];
export const appReducers: ActionReducerMap<AppState> = {
  itemState: itemReducer,
};
