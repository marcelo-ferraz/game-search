/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, fakeAsync} from '@angular/core/testing';
import {IGDB_API_KEY, IgdbBaseSearchService} from './igdb-base-search.service';
import {HttpModule, ResponseOptions, XHRBackend, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {IdNamePair} from '../models/IdNamePair';

describe('IgdbBaseSearchService', () => {

  let backend: MockBackend;

  beforeEach(() => {

    backend = new MockBackend();

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        IgdbBaseSearchService,
        { provide: XHRBackend, useValue: backend }
      ]
    });
  });

  it('should ...', inject([IgdbBaseSearchService], (service: IgdbBaseSearchService) => {
    expect(service).toBeTruthy();
  }));

  describe('get', () => {
    it('should set the request right for what igdb expects and set the value of the result',
      fakeAsync(
        inject([IgdbBaseSearchService], (service: IgdbBaseSearchService) => {
          // Arrange
          const expectedList = [
            new IdNamePair()
          ];
          const sentHeaders = {apikey: '', accept: ''};

          let receivedList: IdNamePair[] = null;

          backend.connections.subscribe((connection: MockConnection) => {
            sentHeaders.apikey =
              connection.request.headers.get('X-Mashape-Key');

            sentHeaders.accept =
              connection.request.headers.get('Accept');

            const response = new Response(<ResponseOptions> { status: 200 });

            (<any>response).ok = true;
            (<any>response)._body = expectedList;

            connection.mockRespond(response);
          });

          const expectEndPoint = 'tm';

          // Act
          (<any>service).get(expectEndPoint).subscribe((list) => {
            receivedList = list;
          });

          expect(receivedList).toBe(expectedList);
          expect(sentHeaders.apikey).toBe(IGDB_API_KEY);
          expect(sentHeaders.accept).toBe('application/json');
        })
      )
    );

    it('should not set the value of the result if the response is wrong',
      fakeAsync(
        inject([IgdbBaseSearchService], (service: IgdbBaseSearchService) => {
          // Arrange
          const expectedList = [
            new IdNamePair()
          ];


          let receivedList: IdNamePair[] = null;

          backend.connections.subscribe((connection: MockConnection) => {

            const response = new Response(<ResponseOptions> { status: 404 });

            (<any>response).ok = false;
            (<any>response)._body = expectedList;

            connection.mockRespond(response);
          });

          const expectEndPoint = 'tm';

          // Act
          (<any>service).get(expectEndPoint).subscribe((list) => {
            receivedList = list;
          });

          expect(receivedList).toBeNull();
        })
      )
    );

  });
});
