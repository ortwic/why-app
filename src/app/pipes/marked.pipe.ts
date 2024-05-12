import { Pipe, PipeTransform, inject } from '@angular/core';
import { marked } from 'marked';
import { markedMedia } from './marked-media.extension';
import { MediaStorageService } from '../services/common/media-storage.service';

@Pipe({
    name: 'marked',
    standalone: true,
})
export class MarkedPipe implements PipeTransform {
    private _service = inject(MediaStorageService);

    transform(value: string): Promise<string> {
        marked.use(markedMedia((path) => this._service.downloadUrl(path)));
        return marked(value) as Promise<string>;
    }
}
