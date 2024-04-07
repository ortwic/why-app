import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IFrameComponent } from '../../components/ui/iframe/iframe.component';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';
import { MarkedPipe } from '../../pipes/marked.pipe';

@Component({
    selector: 'app-blog-post',
    standalone: true,
    imports: [CommonModule, IFrameComponent, MarkedPipe],
    templateUrl: './blog-post.component.html',
    styles: ``,
})
export class BlogPostComponent {
    readonly route = inject(ActivatedRoute);
    readonly blogService = inject(BlogService);

    readonly document = this.loadDocument();

    private async loadDocument(): Promise<BlogPost | undefined> {
        const id = this.route.snapshot.params['id'];
        return this.blogService.getDocument<BlogPost>(id).then((post) => {
            if (post) {
                document.title = post.title + ' | Why App';
            }
            return post;
        });
    }
}
