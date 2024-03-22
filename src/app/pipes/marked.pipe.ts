import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'marked',
  standalone: true
})
export class MarkedPipe implements PipeTransform {

  transform(value: string): string | Promise<string> {
    return marked(value);
  }

}
