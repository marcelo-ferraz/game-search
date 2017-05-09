import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {FormsModule} from '@angular/forms';
import { SearchHomeComponent } from './search-home/search-home.component';
import {RouterModule} from '@angular/router';
import {SharedFeaturesModule} from '../shared-features.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedFeaturesModule
  ],
  declarations: [
    SearchBarComponent,
    SearchHomeComponent
  ]
})
export class SearchModule { }
