import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HighlightPipe} from './pipes/highlight.pipe';

@NgModule({
  declarations: [
    HighlightPipe
  ],
  exports: [
    HighlightPipe
  ],
  imports: [
  ],
  providers: []
})
export class SharedFeaturesModule { }
