import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { IFrameComponent } from '../../components/ui/iframe/iframe.component';
import { MarkdownComponent } from '../../components/ui/markdown/markdown.component';
import { BlogService } from '../../services/blog/blog.service';
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

    readonly document = this._route.params.pipe(
        switchMap((params) => this.loadDocument(params['id']))
    );

    private async loadDocument(id: string): Promise<BlogPost> {
        return this._blogService.getDocument<BlogPost>(id).then((post) => {
            console.log(post)
            if (post) {
                document.title = post.title + ' | Why App';
                return post;
            }
            return {
                title: 'Blog Post Not Found',
                content: [
                    {
                        type: 'text',
                        value: 'The blog post you were looking for was not found',
                    },
                ],
            } as BlogPost;
        });
    }
}
