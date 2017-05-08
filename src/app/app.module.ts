import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import {HighlightPipe} from './pipes/highlight.pipe';
import { TopBarComponent } from './top-bar/top-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HighlightPipe,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
