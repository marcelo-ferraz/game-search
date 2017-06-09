/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IgdbBaseSearchService } from './igdb-base-search.service';

describe('IgdbBaseSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IgdbBaseSearchService]
    });
  });

  it('should ...', inject([IgdbBaseSearchService], (service: IgdbBaseSearchService) => {
    expect(service).toBeTruthy();
  }));
});
