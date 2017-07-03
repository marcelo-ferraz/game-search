import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBarComponent} from './quick-search/search-bar/search-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchHomeComponent } from './search-home/search-home.component';
import {RouterModule} from '@angular/router';
import {SharedFeaturesModule} from '../shared-features.module';
import { SearchBarPanelComponent } from './quick-search/search-bar-panel/search-bar-panel.component';
import {SearchGameCardComponent} from './search-game-card/search-game-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedFeaturesModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchBarComponent,
    SearchHomeComponent,
    SearchGameCardComponent,
    SearchBarPanelComponent
  ]
})
export class SearchModule { }
