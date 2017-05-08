import {Component, Input, OnInit} from '@angular/core';
import {SimpleAutocompleteModel} from '../models/SimpleAutocompleteModel';
import {IgdbSearchService} from '../igdb-search-service/igdb-search.service';

@Component({
  selector: 'gs-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./_search-bar.component.scss'],
  providers: [
    IgdbSearchService
  ]
})
export class SearchBarComponent implements OnInit {
  @Input()
  public searchTerm: string;

  public games: SimpleAutocompleteModel[];

  public get canShowGames (): boolean {
    return !!(this.games && this.games[0]);
  }

  constructor(private igdbSearchService: IgdbSearchService) { }

  ngOnInit() {
  }

  public searchforTerm (value: string) {
    if (!value || value.length < 3) { return; }

    this.igdbSearchService
      .search4Games2AutoComplete(value)
      .subscribe(games => {
        this.games = games;
      });
  }
}
