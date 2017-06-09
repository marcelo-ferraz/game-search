import { Component } from '@angular/core';
import {ArrayUtilities} from './utilities/array.utilities';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    ArrayUtilities.addFlatten();
  }
}
