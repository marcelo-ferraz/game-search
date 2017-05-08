/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IgdbSearchService } from './igdb-search.service';

describe('IgdbSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IgdbSearchService]
    });
  });

  it('should ...', inject([IgdbSearchService], (service: IgdbSearchService) => {
    expect(service).toBeTruthy();
  }));
});
