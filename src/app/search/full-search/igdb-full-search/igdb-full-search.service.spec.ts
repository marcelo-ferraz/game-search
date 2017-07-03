/* tslint:disable:no-unused-variable */

import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend} from '@angular/http/testing';
import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {FIELDS_FOR_GAMES, IgdbFullSearchService} from './igdb-full-search.service';
import {Observable} from 'rxjs';
import {IdNamePair} from '../../models/IdNamePair';
import {GameInfo} from '../models/Game-Info.model';
import {observable} from 'rxjs/symbol/observable';
import {ArrayUtilities} from '../../../utilities/array.utilities';

describe('IgdbFullSearchService', () => {
  beforeEach(() => {
    ArrayUtilities.addSelectMany();
    ArrayUtilities.addDistinct();

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        IgdbFullSearchService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([IgdbFullSearchService], (service: IgdbFullSearchService) => {
    expect(service).toBeTruthy();
  }));


  describe('getGenres', () => {
    it('should call the base "get" function passing the right parameters',
      inject([IgdbFullSearchService], (service: IgdbFullSearchService) => {
        const spy = jasmine.createSpy('get');
        (<any> service).get = spy;

        const requestedIds = [1, 2];
        const expectedRequestUrl =
          `genres/${requestedIds.join(',')}?fields=name`;

        (<any>service).getGenres(requestedIds);

        expect(spy).toHaveBeenCalledWith(expectedRequestUrl);
      })
    );
  });

  describe('getBetterImages', () => {
    it('should change the values of the cover urls to reflect a bigger image',
      inject([IgdbFullSearchService], (service: IgdbFullSearchService) => {
        const smallCoverImgUrl = '/t_thumb/';
        const game = <GameInfo> { cover: { url: `____${ smallCoverImgUrl }____` } };
        const bigCoverImgUrl = 't_cover_big';

        (<any> service).getBetterImages([ game ]);

        expect(game.cover.url).toContain(bigCoverImgUrl);
      })
    );
  });

  describe('enhanceEachModel', () => {
    it('should add the right genre model to the right place',
      inject([IgdbFullSearchService], (service: IgdbFullSearchService) => {
        const game = <GameInfo> { genres: [2] };

        const genres = [
          { id: 1, val: 'val 1' },
          { id: 2, val: 'val 2' }
        ];

        (<any> service).enhanceEachModel([ game ], 'genres', genres);

        expect(game.genres[0]).toBe(genres[1]);
      })
    );
  });

  describe('enhanceModels', () => {
    it('should try to enhance the model passing the right values',
      inject([IgdbFullSearchService], (service: IgdbFullSearchService) => {
        const passedGenreId = 2;
        const game = <GameInfo> { genres: [passedGenreId] };

        const genres = [
          { id: 1, val: 'val 1' },
          { id: 2, val: 'val 2' }
        ];

        const spyOnGetGenres =
          jasmine.createSpy('getGenres').and.callFake(() => Observable.of(genres));
        const spyOnGetBetterImages = jasmine.createSpy('getBetterImages').and.stub();

        (<any> service).getGenres = spyOnGetGenres;
        (<any> service).enhanceEachModel = jasmine.createSpy('enhanceEachModel').and.stub();
        (<any> service).getBetterImages = spyOnGetBetterImages;

        (<any> service).enhanceModels([ game ]);

        expect(spyOnGetGenres).toHaveBeenCalledWith([ passedGenreId ]);
        expect(spyOnGetBetterImages).toHaveBeenCalledWith([game]);
      })
    );
  });

  describe('search4Games', () => {
    it('should call the base "get" function passing the right parameters',
      fakeAsync(
        inject([IgdbFullSearchService], (service: IgdbFullSearchService) => {
          const expectedList = [
            new IdNamePair()
          ];

          const spy4get = jasmine.createSpy('get').and.callFake(() => Observable.of(expectedList));

          (<any> service).get = spy4get;
          (<any> service).enhanceModels = () => {};

          const requestedTerm = 'term';
          const requestedLimit = 10;
          const requestedOffset = 1;

          const expectedRequestUrl =
            `games/?search=${requestedTerm}&limit=${requestedLimit}&offset=${requestedOffset || 0}&fields=${FIELDS_FOR_GAMES.join('%2C')}`;

          service.search4Games(requestedTerm, requestedLimit, requestedOffset);

          tick();

          expect(spy4get).toHaveBeenCalledWith(expectedRequestUrl);
        })
      )
    );
  });

});
