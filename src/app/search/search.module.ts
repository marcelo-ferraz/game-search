import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IgdbSearchService} from './igdb-search-service/igdb-search.service';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SimpleAutocompleteModel} from './models/SimpleAutocompleteModel';
import {FormsModule} from '@angular/forms';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { SearchHomeComponent } from './search-home/search-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SimpleAutocompleteModel,
    SearchBarComponent,
    IgdbSearchService,
    HighlightPipe,
    SearchHomeComponent
  ]
})
export class SearchModule { }
