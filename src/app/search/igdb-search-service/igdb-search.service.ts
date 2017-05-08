import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import {Headers, Http, Response, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SimpleAutocompleteModel} from '../models/SimpleAutocompleteModel';

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

  private concatFieldNames (...fields: string[]) {
    return fields.join(`%2C`);
  }

  private get(endpoint: string): Observable<Response> {
    return this.http.get(
      `https://igdbcom-internet-game-database-v1.p.mashape.com/${endpoint}`,
      {
        headers: this._headers,
        responseType: ResponseContentType.Json
      })
      .filter(response => { return (response.status === 200 && response.ok); })
      .map(response => { return (<any>response)._body; });
  }

  private convertToAutoComplete (response: any): SimpleAutocompleteModel {
    const model = new SimpleAutocompleteModel();

    model.id = response.id;
    model.name = response.name;
    model.coverUrl = response.cover ? response.cover.url : '';

    return model;
  }

  public search4Games (term: string, limit?: number, offset?: number) {
    return this.get(`games/?search=${term}&limit=${limit || DEFAULT_LIMIT}&offset=${offset || 0}`);
  }

  public search4Games2AutoComplete (term: string, limit?: number, offset?: number): Observable<SimpleAutocompleteModel[]> {
    const url = `games/?search=${term}&limit=${limit || DEFAULT_LIMIT}&offset=${offset || 0}&fields=${this.concatFieldNames('name', 'cover.url')}`;

    return this.get(url)
      .map(games => {
        return (<any>games).map(this.convertToAutoComplete);
      });
  }
}
