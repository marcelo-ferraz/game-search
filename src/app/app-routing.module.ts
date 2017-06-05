import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SearchHomeComponent} from './search/search-home/search-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/search-bar', pathMatch: 'full' },
  { path: 'search',  component: SearchHomeComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
