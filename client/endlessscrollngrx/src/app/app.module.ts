import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemEffects, itemReducer } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ itemState: itemReducer }),
    EffectsModule.forRoot(itemEffects),
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
