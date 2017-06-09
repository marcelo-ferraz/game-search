/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IgdbFullSearchService } from './igdb-full-search.service';

describe('IgdbFullSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IgdbFullSearchService]
    });
  });

  it('should ...', inject([IgdbFullSearchService], (service: IgdbFullSearchService) => {
    expect(service).toBeTruthy();
  }));
});
