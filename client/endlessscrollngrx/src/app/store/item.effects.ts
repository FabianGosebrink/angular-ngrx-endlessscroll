import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import * as appActions from './item.actions';
import { Store, select } from '@ngrx/store';
import { ItemsApiService } from '../services/items-api.service';
import { selectAllItemsLength } from './item.selectors';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private apiService: ItemsApiService
  ) {}

  getAllItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.getItems),
      switchMap(() =>
        this.apiService.getAllItems().pipe(
          map((result) => appActions.getItemsComplete({ payload: result })),
          catchError((error) =>
            of(appActions.error({ payload: JSON.stringify(error) }))
          )
        )
      )
    )
  );

  getMoreItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.getMoreItems),
      withLatestFrom(this.store.pipe(select(selectAllItemsLength))),
      map(([{}, skip]) => skip),
      switchMap((skip) =>
        this.apiService.getAllItems({ skip }).pipe(
          map((result) => appActions.getItemsComplete({ payload: result })),
          catchError((error) =>
            of(appActions.error({ payload: JSON.stringify(error) }))
          )
        )
      )
    )
  );

  error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.error),
        tap((error) => console.log(error))
      ),
    { dispatch: false }
  );
}
