/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { SearchHomeComponent } from './search-home.component';
import {Observable} from 'rxjs';
import {ArrayExtended} from '../../utilities/array.extended';
import {GameInfo} from '../full-search/models/Game-Info.model';
import {IgdbFullSearchService} from '../full-search/igdb-full-search/igdb-full-search.service';
import {SearchModule} from '../search.module';
import {RouterModule} from '@angular/router';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend} from '@angular/http';

describe('SearchHomeComponent', () => {
  let component: SearchHomeComponent;
  let fixture: ComponentFixture<SearchHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHomeComponent ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
      imports:      [ RouterModule ]
    })
    .overrideComponent(SearchHomeComponent, {
      set: {
        providers: [
          { provide: IgdbFullSearchService, useClass: IgdbFullSearchServiceSpy },
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search', () => {
    it('should call the search service passing the searched term',
      fakeAsync(() => {
        // Arrange
        const expectedGames = <ArrayExtended<GameInfo>> [
          <GameInfo>{}
        ];

        const usedTerm = 'term';
        const searchService = <IgdbFullSearchServiceSpy> (<any>component).searchService;
        searchService.games = expectedGames;

        // Act
        component.search(usedTerm);
        // Assert

        expect(searchService.search4Games).toHaveBeenCalledWith(usedTerm);
        expect(component.games).toBe(expectedGames);
      })
    );
  });
});

class IgdbFullSearchServiceSpy {

  public games: GameInfo[];

  search4Games = jasmine
    .createSpy('search4Games')
    .and
    .callFake(
      () => Observable.of(this.games));
}

