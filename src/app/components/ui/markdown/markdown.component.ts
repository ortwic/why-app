import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MarkedPipe } from '../../../pipes/marked.pipe';

@Component({
    selector: 'app-markdown',
    standalone: true,
    templateUrl: './markdown.component.html',
    styleUrl: './markdown.component.scss',
    imports: [CommonModule, MarkedPipe],
})
export class MarkdownComponent {
    private _router = inject(Router);
    @Input({ required: true }) content!: string;

    // https://stackoverflow.com/questions/51764517/use-angular-router-inside-markdown-links
    public onClick(e: MouseEvent): void {
        const srcElem = e.target;
        if (srcElem instanceof HTMLAnchorElement) {
            const href = srcElem.href;
            const isLocalLink = href.startsWith(srcElem.baseURI);
            if (isLocalLink) {
                e.preventDefault();
                e.stopPropagation();
                
                const url = new URL(href);
                const fragment = url.hash ? url.hash.substring(1) : undefined;
                this._router.navigate([url.pathname], { fragment });
            }
        }
    }
}
