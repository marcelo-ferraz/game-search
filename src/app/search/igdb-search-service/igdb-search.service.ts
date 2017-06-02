import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import {Headers, Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';

const apiKey = 'i7AiUJEiaQmshtyp0mPWH55ECwYZp139koAjsn3T8FrS0u4FgX';
export const DEFAULT_LIMIT = 10;

// documentation: https://igdb.github.io/api/endpoints/company/
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
