import {Component, OnInit, Output} from '@angular/core';
import {IdNamePair} from '../../models/IdNamePair';
import {IgdbQuickSearchService} from '../igdb-quick-search-service/igdb-quick-search.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import EventEmitter = NodeJS.EventEmitter;

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
  public fullSearch: EventEmitter;

  public searchInput: FormControl;

  public games: IdNamePair[];
  public companies: IdNamePair[];
  public franchises: IdNamePair[];

  public showQuickResults: boolean;

  public get hideResultsPanel(): boolean {
    return !(this.games && this.games.length) &&
      !(this.companies && this.companies.length) &&
      !(this.franchises && this.franchises.length);
  }

  constructor(private searchService: IgdbQuickSearchService) {
    this.searchInput = new FormControl();
    this.fullSearch = new EventEmitter();
  }

  private dispatchAll (val): void {

    this.searchService
      .search4Games2AutoComplete(val)
      .subscribe(result => this.games = result);

    this.searchService
      .search4Companies2AutoComplete(val)
      .subscribe(result => this.companies = result);

    this.searchService
      .search4Franchises2AutoComplete(val)
      .subscribe(result => this.franchises = result);
  }

  ngOnInit() {
    this.searchInput
      .valueChanges
      .distinctUntilChanged((val1, val2) => val1 === val2)
      .debounceTime(750)
      // .filter(v => v.length > 2)
      .subscribe(val => {
        debugger;
        this.showQuickResults = true;
        this.dispatchAll(val);
      });
  }

  public search (eventArgs) {
    this.showQuickResults = false;
    this.fullSearch.emit(this.searchInput.value);
  }
}
