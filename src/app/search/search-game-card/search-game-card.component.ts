import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GameInfo} from '../full-search/models/Game-Info.model';
import {GameEventType} from '../game-event-type.enum';

@Component({
  selector: 'gs-search-game-card',
  templateUrl: './search-game-card.component.html',
  styleUrls: ['./search-game-card.component.scss']
})
export class SearchGameCardComponent implements OnInit {

  @Input()
  public game: GameInfo;

  @Output()
  public onGameSelected: EventEmitter<{ type: GameEventType, game: GameInfo }>;

  constructor() {
    this.onGameSelected = new EventEmitter<{ type: GameEventType, game: GameInfo }>();
  }

  ngOnInit() {
  }

  public selectToSearchOnTrademe () {
    this.onGameSelected.emit({type: GameEventType.searchTrademe, game: this.game});
  }
}
