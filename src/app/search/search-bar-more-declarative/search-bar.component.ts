import {Component, Input, OnInit} from '@angular/core';
import {IdNamePair} from '../models/IdNamePair';
import {IgdbQuickSearchService} from '../igdb-search-service/igdb-search.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'gs-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./_search-bar.component.scss'],
  providers: [
    IgdbQuickSearchService
  ]
})
export class SearchBarComponent implements OnInit {

  public searchInput;

  public games: IdNamePair[];
  public companies: IdNamePair[];
  public franchises: IdNamePair[];

  public get hideResultsPanel(): boolean {
    return !(this.games && this.games.length) &&
      !(this.companies && this.companies.length) &&
      !(this.franchises && this.franchises.length);
  }


  constructor(private igdbSearchService: IgdbQuickSearchService) {
    this.searchInput = new FormControl();
  }

  ngOnInit() {
    this.searchInput
      .valueChanges
      .distinctUntilChanged((val1, val2) => val1 === val2)
      .debounceTime(500)
      .filter(v => v.length > 2)
      .subscribe(val => {
        this.igdbSearchService
          .search4Games2AutoComplete(val)
          .subscribe(result => this.games = result);

        this.igdbSearchService
          .search4Companies2AutoComplete(val)
          .subscribe(result => this.companies = result);

        this.igdbSearchService
          .search4Franchises2AutoComplete(val)
          .subscribe(result => this.franchises = result);
      });
  }
}
