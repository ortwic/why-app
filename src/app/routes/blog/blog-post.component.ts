import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { IFrameComponent } from '../../components/ui/iframe/iframe.component';
import { MarkdownComponent } from '../../components/ui/markdown/markdown.component';
import { BlogService } from '../../services/content/blog.service';
import { BlogPost } from '../../models/blog.model';

@Component({
    selector: 'app-blog-post',
    standalone: true,
    imports: [CommonModule, IFrameComponent, MarkdownComponent],
    templateUrl: './blog-post.component.html',
    styles: ``,
})
export class BlogPostComponent {
    private readonly _route = inject(ActivatedRoute);
    private readonly _blogService = inject(BlogService);

    readonly post$ = this._route.params.pipe(
        switchMap((params) => this._blogService.getBlogPost(params['id'])),
        tap((post) => document.title = post.title + ' | Why App')
    );
}
