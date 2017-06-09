import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IdNamePair} from '../../models/IdNamePair';
import {IgdbQuickSearchService} from '../igdb-quick-search-service/igdb-quick-search.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
// import EventEmitter = NodeJS.EventEmitter;

@Component({
  selector: 'gs-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./_search-bar.component.scss'],
  providers: [
    IgdbQuickSearchService
  ]
})
export class SearchBarComponent implements OnInit {

  @Output()
  public onFullSearch: EventEmitter<string>;

  public cancelQuickSearch = false;

  public searchInput: FormControl;

  public games$: Observable<IdNamePair[]>;
  public companies$: Observable<IdNamePair[]>;
  public franchises$: Observable<IdNamePair[]>;

  public showQuickResults: boolean;

  constructor(private searchService: IgdbQuickSearchService) {
    this.searchInput = new FormControl();
    this.onFullSearch = new EventEmitter();
  }

  private dispatchAll (val): void {

    this.games$ = this.searchService
      .search4Games2AutoComplete(val);

    this.companies$ = this.searchService
      .search4Companies2AutoComplete(val);

    this.franchises$ = this.searchService
      .search4Franchises2AutoComplete(val);
  }

  ngOnInit() {
    this.searchInput
      .valueChanges
      .do(() => this.cancelQuickSearch  = false)
      .distinctUntilChanged((val1, val2) => val1 === val2)
      .debounceTime(750)
      .filter(v => !this.cancelQuickSearch )
      .subscribe(val => {
        this.showQuickResults = true;
        this.dispatchAll(val);
      });
  }

  public search (eventArgs) {
    this.cancelQuickSearch = true;
    this.showQuickResults = false;
    this.onFullSearch.emit(this.searchInput.value);
  }
}
