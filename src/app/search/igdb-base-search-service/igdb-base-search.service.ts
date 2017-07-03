import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import {Headers, Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export const IGDB_API_KEY = 'i7AiUJEiaQmshtyp0mPWH55ECwYZp139koAjsn3T8FrS0u4FgX';
export const DEFAULT_LIMIT = 10;

export const IGDB_BASE_URL = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

// documentation: https://igdb.github.io/api/endpoints/company/
@Injectable()
export abstract class IgdbBaseSearchService {

  protected get defaultLimit () {
    return DEFAULT_LIMIT;
  }

  private _headers: Headers;

  constructor(
    protected http: Http) {
    this._headers = new Headers();
    this._headers.set('X-Mashape-Key', IGDB_API_KEY)
    this._headers.set('Accept', 'application/json');
  }

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get(
      `${IGDB_BASE_URL}/${endpoint}`,
      {
        headers: this._headers,
        responseType: ResponseContentType.Json
      })
      .filter(response => (response.status === 200 && response.ok))
      .map(response => (<any>response)._body);
  }
}
