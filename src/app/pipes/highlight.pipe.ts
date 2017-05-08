import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(text: string, ...args): string {
    let pattern = args[0].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

    pattern = pattern.split(' ').filter((t) => {
      return t.length > 0;
    }).join('|');

    const regex = new RegExp(pattern, 'gi');

    return args[0] ? text.replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }
}
