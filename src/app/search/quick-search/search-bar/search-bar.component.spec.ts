/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { SearchBarComponent } from './search-bar.component';
import {Observable} from 'rxjs/Observable';
import {IdNamePair} from '../../models/IdNamePair';
import {IgdbQuickSearchService} from '../igdb-quick-search-service/igdb-quick-search.service';
import {FormControl} from '@angular/forms/src/forms';
import {ReactiveFormsModule} from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports:      [ ReactiveFormsModule ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .overrideComponent(SearchBarComponent, {
      set: {
        providers: [
          { provide: IgdbQuickSearchService, useValue: new IgdbQuickSearchServiceSpy() }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fullSearch', () => {
    it('should trigger the event onFullSearch, cancel quick search and hide the quick results',
      fakeAsync(() => {
        // Arrange
        const expectValue = 'value';

        component.searchInput = <FormControl> {value: expectValue};

        component.onFullSearch.subscribe((term) => {
          // Assert event is triggered with the right value
          expect(term).toBe(expectValue);
        });

        // Act
        component.fullSearch();
        tick();

        // Assert
        expect(component.cancelQuickSearch).toBe(true);
        expect(component.showQuickResults).toBe(false);
      })
    );
  });

  describe('dispatchAll', () => {
    it('should set all the observables', () => {
      // Assert before
      expect(component.games$).not.toBeDefined();
      expect(component.companies$).not.toBeDefined();
      expect(component.franchises$).not.toBeDefined();

      // Act
      (<any>component).dispatchAll('');

      // assert after
      expect(component.games$).not.toBeNull();
      expect(component.companies$).not.toBeNull();
      expect(component.franchises$).not.toBeNull();
    });
  });
});

class SearchBarComponentSpy {
  dispatchAll = jasmine
    .createSpy('dispatchAll');
}

class IgdbQuickSearchServiceSpy {

  public games: IdNamePair[];
  public companies: IdNamePair[];
  public franchises: IdNamePair[];

  search4Games2AutoComplete = jasmine
    .createSpy('search4Games2AutoComplete')
    .and
    .callFake(
      () => Observable.of(this.games));

  search4Companies2AutoComplete = jasmine
    .createSpy('search4Companies2AutoComplete')
    .and
    .callFake(
      () => Observable.of(this.games));

  search4Franchises2AutoComplete = jasmine
    .createSpy('search4Franchises2AutoComplete')
    .and
    .callFake(
      () => Observable.of(this.games));
}
