import { Injectable } from '@angular/core';
import {DEFAULT_LIMIT, IgdbBaseSearchService} from '../../igdb-base-search-service/igdb-base-search.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/observable';
import {GameInfo} from '../models/Game-Info.model';
import {IdNamePair} from '../../models/IdNamePair';
import {ArrayExtended} from '../../../utilities/array.extended';

@Injectable()
export class IgdbFullSearchService extends IgdbBaseSearchService {

  constructor(
    http: Http) {
    super(http);
  }

  private addGenres (games: ArrayExtended<GameInfo>): Observable<ArrayExtended<GameInfo>> {
    const genreIds = games
      .selectMany(g => g.genres)
      .distinct();

    return this
      .getGenres(genreIds)
      .map(genres => {

        for (let i = 0; i < games.length; i++) {
          for (let j = 0; j < games.length; j++) {
            const id = games[i].genres[j];
            games[i].genres[j] =
              genres.find(pair => pair.id === id);
          }
        }

        return games;
      });
  }

  public search4Games(term: string, limit?: number, offset?: number): Observable<ArrayExtended<GameInfo>> {
    const fields = this.concatFieldNames(
      'name',
      'summary',
      'category',
      'genres',
      'cover',
      'tags',
      'esrb',
      'pegi',
      'developers',
      'publishers');

    return this
      .get<ArrayExtended<GameInfo>>(`games/?search=${term}&limit=${limit || DEFAULT_LIMIT}&offset=${offset || 0}&fields=${fields}`)
      .switchMap(games => this.addGenres(games));
  }

  public getGenres(ids: number[]): Observable<IdNamePair[]> {
    return this.get<GameInfo[]>('games/?fields=name&filter[id][in]=' + ids.join(','));
  }
}
