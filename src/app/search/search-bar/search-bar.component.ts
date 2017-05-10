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

  @Input()
  public games$: Observable<IdNamePair[]>;
  public companies$: Observable<IdNamePair[]>;
  public franchises$: Observable<IdNamePair[]>;

  constructor(private igdbSearchService: IgdbQuickSearchService) {
     this.searchInput = new FormControl();
  }

  ngOnInit() {
    const input$ = this
      .searchInput
      .valueChanges
      .debounceTime(500)
      .filter(v => { return v.length > 2; });

    this.games$ = input$.switchMap(
      (val, i) => {
        console.log('value:' + val);
        return this.igdbSearchService.search4Games2AutoComplete(val);
      });

    this.companies$ = input$.switchMap(
      (val, i) => {
        return this.igdbSearchService.search4Companies2AutoComplete(val);
      });

    this.franchises$ = input$.switchMap(
      (val, i) => {
        return this.igdbSearchService.search4Franchises2AutoComplete(val);
      });
  }
}
