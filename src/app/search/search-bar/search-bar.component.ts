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

  public games$: Observable<IdNamePair[]>;
  public companies$: Observable<IdNamePair[]>;
  public franchises$: Observable<IdNamePair[]>;

  public quickSearch$: Observable<IdNamePair[]>;

  constructor(private igdbSearchService: IgdbQuickSearchService) {
     this.searchInput = new FormControl();
  }

  private t = 0;
  private g = 0;
  private c = 0;
  private f = 0;

  ngOnInit() {
    const input$ = this
      .searchInput
      .valueChanges
      .distinctUntilChanged((val1, val2) => val1 === val2)
      .debounceTime(200)
      .filter(v => { return v.length > 2; });

    this.games$ = input$.switchMap(
      (val, i) => {
        console.log(`${this.t}; games$ called. Value: ${val}, f: ${this.g}`);
        this.g++;
        this.t++;
        return this.igdbSearchService.search4Games2AutoComplete(val);
      }).share();

    this.companies$ = input$.switchMap(
      (val, i) => {
        console.log(`${this.t}; companies$ called. Value: ${val}, f: ${this.c}`);
        this.c++;
        this.t++;
        return this.igdbSearchService.search4Companies2AutoComplete(val);
      }).share();

    this.franchises$ = input$.switchMap(
      (val, i) => {
        console.log(`${this.t}; franchises$ called. Value: ${val}, f: ${this.f}`);
        this.f++;
        this.t++;
        return this.igdbSearchService.search4Franchises2AutoComplete(val);
      }).share();
  }
}
