import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { IFrameContent } from '../../../models/content.model';

@Component({
    selector: 'app-iframe',
    standalone: true,
    imports: [SafeUrlPipe],
    templateUrl: './iframe.component.html',
    styleUrl: './iframe.component.scss',
})
export class IFrameComponent {
    @Input({ required: true }) value!: IFrameContent['value'];

    get src() {
        if (this.value.type === 'youtube') {
            return `https://www.youtube.com/embed/${this.value.src}`;
        }
        return this.value.src;
    }
}
