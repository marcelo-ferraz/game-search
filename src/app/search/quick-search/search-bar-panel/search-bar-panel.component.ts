import {Component, Input, OnInit} from '@angular/core';
import {IdNamePair} from '../../models/IdNamePair';

@Component({
  selector: 'gs-search-bar-panel',
  templateUrl: './search-bar-panel.component.html',
  styleUrls: ['./search-bar-panel.component.scss']
})
export class SearchBarPanelComponent implements OnInit {
  @Input()
  public collection: IdNamePair [];

  @Input()
  public link: string;

  constructor() { }

  ngOnInit() {
  }
}
