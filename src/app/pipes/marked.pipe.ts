import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';
import { markedMedia } from './marked-media.extension';

export const resourceUrl = "https://firebasestorage.googleapis.com/v0/b/why-app-8a640.appspot.com/o/";

@Pipe({
    name: 'marked',
    standalone: true,
})
export class MarkedPipe implements PipeTransform {
    constructor() {
        marked.use(markedMedia(resourceUrl));
    }

    transform(value: string): string | Promise<string> {
        return marked(value);
    }
}
