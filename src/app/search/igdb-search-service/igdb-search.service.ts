import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import {Headers, Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IdNamePair} from '../models/IdNamePair';

const apiKey = 'i7AiUJEiaQmshtyp0mPWH55ECwYZp139koAjsn3T8FrS0u4FgX';
const DEFAULT_LIMIT = 10;
@Injectable()
export class IgdbSearchService {
  private _headers: Headers;

  constructor(
    private http: Http) {
    this._headers = new Headers();
    this._headers.set('X-Mashape-Key', apiKey)
    this._headers.set('Accept', 'application/json');
  }

  protected concatFieldNames (...fields: string[]) {
    return fields.join(`%2C`);
  }

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get(
      `https://igdbcom-internet-game-database-v1.p.mashape.com/${endpoint}`,
      {
        headers: this._headers,
        responseType: ResponseContentType.Json
      })
      .filter(response => (response.status === 200 && response.ok))
      .map(response => (<any>response)._body);
  }

  public search4Games (term: string, limit?: number, offset?: number) {
    return this.get(`games/?search=${term}&limit=${limit || DEFAULT_LIMIT}&offset=${offset || 0}`);
  }
}

@Injectable()
export class IgdbQuickSearchService extends IgdbSearchService {
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
