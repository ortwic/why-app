import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { IFrameComponent } from '../../components/ui/iframe/iframe.component';
import { MarkdownComponent } from '../../components/ui/markdown/markdown.component';
import { BlogService } from '../../services/content/blog.service';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Component({
    selector: 'app-blog-post',
    standalone: true,
    imports: [CommonModule, IFrameComponent, MarkdownComponent],
    templateUrl: './blog-post.component.html',
    styles: ``,
})
export class BlogPostComponent implements OnDestroy {
    private readonly _route = inject(ActivatedRoute);
    private readonly _analytics = inject(Analytics);
    private readonly _blogService = inject(BlogService);
    private _startTime = Date.now();

    readonly post$ = this._route.params.pipe(
        switchMap((params) => this._blogService.getBlogPost(params['id'])),
        tap((post) => document.title = post.title + ' | Why App')
    );

    ngOnDestroy(): void {
        const elapsedTime = Date.now() - this._startTime;
        logEvent(this._analytics, 'blog_post_read', {
            blog_post_id: this._route.snapshot.params['id'],
            read_time: elapsedTime / 1000,
            lang: navigator.language
        });
    }
}
