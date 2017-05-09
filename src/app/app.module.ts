import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {AppRoutingModule} from "./app-routing.module";
import {SearchModule} from "./search/search.module";
import {HighlightPipe} from './pipes/highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
