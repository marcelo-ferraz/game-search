import { Injectable } from '@angular/core';
import {DEFAULT_LIMIT, IgdbBaseSearchService} from '../../igdb-base-search-service/igdb-base-search.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/observable';
import {GameInfo} from '../models/Game-Info.model';
import {IdNamePair} from '../../models/IdNamePair';
import {ArrayExtended} from '../../../utilities/array.extended';

export const FIELDS_FOR_GAMES = [
  'name',
  'summary',
  'category',
  'genres',
  'cover',
  'tags',
  'esrb',
  'pegi',
  'developers',
  'publishers'];

@Injectable()
export class IgdbFullSearchService extends IgdbBaseSearchService {

  constructor(
    http: Http) {
    super(http);
  }

  protected get defaultLimit () {
    return 20;
  }

  private getGenres(ids: number[]): Observable<IdNamePair[]> {
    return this.get<IdNamePair[]>(`genres/${ids.join(',')}?fields=name`);
  }

  private getBetterImages(games: GameInfo[]): void {

    for ( let i = 0; i < games.length; i++) {
      if (games[i].cover && games[i].cover.url) {
        games[i].cover.url = games[i].cover.url.replace('/t_thumb/', '/t_cover_big/');
      }
    }
  }

  private enhanceEachModel(games: GameInfo[], key: string, pairs: IdNamePair[]): GameInfo[] {
    for (let i = 0; i < games.length; i++) {

      if (!games[i][key]) { continue; }

      for (let j = 0; j < games[i][key].length; j++) {

        const id =
          games[i][key][j];

        games[i][key][j] =
          pairs.find(pair => pair.id === id);
      }
    }

    return games;
  }

  private enhanceModels (games: ArrayExtended<GameInfo>): Observable<ArrayExtended<GameInfo>> {
    const genreIds = games
      .selectMany(g => g.genres)
      .distinct();

    const genres$ = this.getGenres(genreIds)
      .map(foundGenres =>
        this.enhanceEachModel(games, 'genres', foundGenres));

    this.getBetterImages(games);

    return genres$;
  }

  public search4Games(term: string, limit?: number, offset?: number): Observable<ArrayExtended<GameInfo>> {
    return this
      .get<ArrayExtended<GameInfo>>(
        `games/?search=${term}&limit=${limit || this.defaultLimit}&offset=${offset || 0}&fields=${FIELDS_FOR_GAMES.join('%2C')}`)
      .switchMap(games => this.enhanceModels(games));
  }
}
