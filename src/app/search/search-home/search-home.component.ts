import {Component, OnInit } from '@angular/core';
import {IgdbFullSearchService} from '../full-search/igdb-full-search/igdb-full-search.service';
import {GameInfo} from '../full-search/models/Game-Info.model';

@Component({
  selector: 'gs-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss'],
  providers: [
    IgdbFullSearchService
  ]
})
export class SearchHomeComponent implements OnInit {

  public games: GameInfo[];

  constructor (
    private searchService: IgdbFullSearchService) { }

  ngOnInit() {
  }

  public search (term) {
     this.searchService
       .search4Games(term)
       .subscribe(games => {
         this.games = games;
       });
  }

  public gameSelected(selected) {
    // todo: add a call to trademe
  }
}
