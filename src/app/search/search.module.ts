import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from './search-bar-more-declarative/search-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchHomeComponent } from './search-home/search-home.component';
import {RouterModule} from '@angular/router';
import {SharedFeaturesModule} from '../shared-features.module';

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
    SearchHomeComponent
  ]
})
export class SearchModule { }
