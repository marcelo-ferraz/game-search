/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { IgdbQuickSearchService } from './igdb-quick-search.service';
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('IgdbQuickSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        IgdbQuickSearchService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([IgdbQuickSearchService], (service: IgdbQuickSearchService) => {
    expect(service).toBeTruthy();
  }));

  describe('search4Games2AutoComplete', () => {
    it('should make a request passing the right parameters', inject([IgdbQuickSearchService], (service: IgdbQuickSearchService) => {
      const spy = jasmine.createSpy('get');
      (<any> service).get = spy;

      const requestedTerm = 'tm';
      const expectedRequestUrl =
        `games/?search=${requestedTerm}`;

      service.search4Games2AutoComplete(requestedTerm);

      expect(spy).toHaveBeenCalledWith(expectedRequestUrl);
    }));
  });

  describe('search4Companies2AutoComplete', () => {
    it('should make a request passing the right parameters', inject([IgdbQuickSearchService], (service: IgdbQuickSearchService) => {
      const spy = jasmine.createSpy('get');
      (<any> service).get = spy;

      const requestedTerm = 'tm';
      const expectedRequestUrl =
        `companies/?search=${requestedTerm}`;

      service.search4Companies2AutoComplete(requestedTerm);

      expect(spy).toHaveBeenCalledWith(expectedRequestUrl);
    }));
  });

  describe('search4Franchises2AutoComplete', () => {
    it('should make a request passing the right parameters', inject([IgdbQuickSearchService], (service: IgdbQuickSearchService) => {
      const spy = jasmine.createSpy('get');
      (<any> service).get = spy;

      const requestedTerm = 'tm';
      const expectedRequestUrl =
        `franchises/?search=${requestedTerm}`;

      service.search4Franchises2AutoComplete(requestedTerm);

      expect(spy).toHaveBeenCalledWith(expectedRequestUrl);
    }));
  });
});
