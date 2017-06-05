/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IgdbQuickSearchService } from './igdb-quick-search.service';

describe('IgdbQuickSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IgdbQuickSearchService]
    });
  });

  it('should ...', inject([IgdbQuickSearchService], (service: IgdbQuickSearchService) => {
    expect(service).toBeTruthy();
  }));
});
