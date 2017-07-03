/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { SearchGameCardComponent } from './search-game-card.component';
import {GameInfo} from '../full-search/models/Game-Info.model';
import {GameEventType} from '../game-event-type.enum';
import {SearchModule} from '../search.module';
import {RouterModule} from '@angular/router';

describe('SearchGameCardComponent', () => {
  let component: SearchGameCardComponent;
  let fixture: ComponentFixture<SearchGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGameCardComponent ],
      imports:      [ RouterModule],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGameCardComponent);
    component = fixture.componentInstance;
    component.game = <GameInfo> { genres: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('selectToSearchOnTrademe', () => {
    it('Should trigger the event onGameSelected', (done) => {
      // Arrange
      const expectedGame = <GameInfo> { genres: [] };
      component.game = expectedGame;

      component.onGameSelected.subscribe((selected) => {
        // Assert
        expect(selected.type).toBe(GameEventType.searchTrademe);
        expect(selected.game).toBe(expectedGame);
        done();
      });

      // Act
      component.selectToSearchOnTrademe();
    });
  });
});
