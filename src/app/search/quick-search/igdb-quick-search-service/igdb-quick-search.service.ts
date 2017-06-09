import { Injectable } from '@angular/core';
import {DEFAULT_LIMIT, IgdbBaseSearchService} from '../../igdb-base-search-service/igdb-base-search.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IdNamePair} from '../../models/IdNamePair';

@Injectable()
export class IgdbQuickSearchService extends IgdbBaseSearchService {
  constructor(
    http: Http) {
    super(http);
  }

  protected get<T>(partialUrl: string): Observable<T> {
    return super.get(`${partialUrl}&limit=${DEFAULT_LIMIT}&fields=name`);
  }

  public search4Games2AutoComplete (term: string): Observable<IdNamePair[]> {
    return this.get(`games/?search=${term}`);
  }

  public search4Companies2AutoComplete (term: string): Observable<IdNamePair[]> {
    return this.get(`companies/?search=${term}`);
  }

  public search4Franchises2AutoComplete (term: string): Observable<IdNamePair[]> {
    return this.get(`franchises/?search=${term}`);
  }
}
