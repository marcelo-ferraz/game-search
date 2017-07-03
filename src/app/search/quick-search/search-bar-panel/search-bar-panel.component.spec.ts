/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { SearchBarPanelComponent } from './search-bar-panel.component';
import {RouterModule} from '@angular/router';

describe('SearchBarPanelComponent', () => {
  let component: SearchBarPanelComponent;
  let fixture: ComponentFixture<SearchBarPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarPanelComponent ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
      imports:      [ RouterModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
