import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item';
import { Store, select } from '@ngrx/store';
import {
  selectAllItems,
  selectIsLoading,
  getItems,
  getMoreItems,
} from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items$: Observable<Item[]>;
  isloading$: Observable<boolean>;
  title = 'endlessscrollngrx';

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(selectAllItems));
    this.isloading$ = this.store.pipe(select(selectIsLoading));

    this.store.dispatch(getItems());
    window.onscroll = () => {
      const scrollHeight = document.body.scrollHeight;
      const totalHeight = window.scrollY + window.innerHeight;

      if (totalHeight >= scrollHeight) {
        this.store.dispatch(getMoreItems());
      }
    };
  }
}
